import User from "../models/User.js";
import Resume from "../models/Resume.js";
import Interview from "../models/Interview.js";

export const getDashboard = async (req, res) => {
  try {

    const userId = req.user._id;

    // Resume
    const resume = await Resume.findOne({
      user: userId,
    });

    // Interviews
    const interviews = await Interview.find({
      user: userId,
    });

    const totalInterviews = interviews.length;

    const completedInterviews = interviews.filter(
      (item) => item.status === "Completed"
    ).length;

    let averageScore = 0;

    if (totalInterviews > 0) {
      const totalScore = interviews.reduce(
        (sum, interview) => sum + interview.score,
        0
      );

      averageScore = Math.round(
        totalScore / totalInterviews
      );
    }

    res.status(200).json({
      success: true,

      dashboard: {

        name: req.user.name,

        email: req.user.email,

        role: req.user.role,

        resumeCreated: !!resume,

        totalInterviews,

        completedInterviews,

        averageScore,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};