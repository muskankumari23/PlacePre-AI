import User from "../models/User.js";
import Resume from "../models/Resume.js";
import Interview from "../models/Interview.js";
import Application from "../models/Application.js";

// ================= Get Dashboard =================
// Returns personalized dashboard data for the authenticated user
// Includes: user profile, profile completion %, resume status,
//           application stats, interview stats, learning defaults

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // ─── 1. Full User Profile (password already excluded by auth middleware) ───
    const user = req.user;

    // ─── 2. Resume ───
    const resume = await Resume.findOne({ user: userId });

    const resumeStatus = {
      created: !!resume,
      completed: false,
      title: resume?.title || "",
      hasProjects: false,
    };

    if (resume) {
      // Resume is "completed" if it has at least summary, skills, and education
      const hasSummary = !!resume.summary;
      const hasSkills = resume.skills && resume.skills.length > 0;
      const hasEducation = resume.education && resume.education.length > 0;
      resumeStatus.completed = hasSummary && hasSkills && hasEducation;
      resumeStatus.hasProjects = resume.projects && resume.projects.length > 0;
    }

    // ─── 3. Applications ───
    const applications = await Application.find({ student: userId });

    const applicationStats = {
      total: applications.length,
      pending: applications.filter((a) => a.status === "Pending").length,
      reviewed: applications.filter((a) => a.status === "Reviewed").length,
      accepted: applications.filter((a) => a.status === "Accepted").length,
      rejected: applications.filter((a) => a.status === "Rejected").length,
    };

    // ─── 4. Interviews ───
    const interviews = await Interview.find({ user: userId }).sort({
      createdAt: -1,
    });

    const completedInterviews = interviews.filter(
      (i) => i.status === "Completed"
    );

    let averageScore = 0;
    if (completedInterviews.length > 0) {
      const totalScore = completedInterviews.reduce(
        (sum, i) => sum + (i.score || 0),
        0
      );
      averageScore = Math.round(totalScore / completedInterviews.length);
    }

    const interviewStats = {
      total: interviews.length,
      completed: completedInterviews.length,
      averageScore,
      latestScore: completedInterviews.length > 0
        ? completedInterviews[0].score
        : 0,
    };

    // ─── 5. Profile Completion ───
    // 7 fields: name, email, education, skills, experience, projects (resume), resume
    let filledFields = 0;
    const totalFields = 7;

    if (user.name) filledFields++;
    if (user.email) filledFields++;
    if (user.education && user.education.length > 0) filledFields++;
    if (user.skills && user.skills.length > 0) filledFields++;
    if (user.experience && user.experience.length > 0) filledFields++;
    if (resumeStatus.hasProjects) filledFields++;
    if (resumeStatus.created) filledFields++;

    const profileCompletion = Math.round((filledFields / totalFields) * 100);

    // ─── 6. Learning / DSA (safe defaults — modules not yet implemented) ───
    const learning = {
      dsaSolved: 0,
      quizScore: 0,
      progress: 0,
    };

    // ─── Response ───
    res.status(200).json({
      success: true,
      dashboard: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          skills: user.skills,
          education: user.education,
          experience: user.experience,
          careerPreferences: user.careerPreferences,
          createdAt: user.createdAt,
        },
        profileCompletion,
        resume: resumeStatus,
        applications: applicationStats,
        interviews: interviewStats,
        learning,
      },
    });
  } catch (error) {
    console.log("Dashboard Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
    });
  }
};