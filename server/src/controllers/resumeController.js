import Resume from "../models/Resume.js";
import generateResumePDF from "../utils/resumePdf.js";

export const createResume = async (req, res) => {
  try {
    const { title, summary, skills } = req.body;

    // Check if user already has a resume
    const existingResume = await Resume.findOne({ user: req.user._id });

    if (existingResume) {
      return res.status(400).json({
        success: false,
        message: "Resume already exists",
      });
    }

    const resume = await Resume.create({
      user: req.user._id,
      title,
      summary,
      skills,
    });

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user._id,
    }).populate("user", "name email role");

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateResume = async (req, res) => {
  try {

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const {
      title,
      summary,
      skills,
      education,
      experience,
      projects,
    } = req.body;

    if (title !== undefined) resume.title = title;

    if (summary !== undefined) resume.summary = summary;

    if (skills !== undefined) resume.skills = skills;

    if (education !== undefined) resume.education = education;

    if (experience !== undefined) resume.experience = experience;

    if (projects !== undefined) resume.projects = projects;
await resume.save();

const updatedResume = await Resume.findById(resume._id)
  .populate("user", "name email role");

res.status(200).json({
  success: true,
  message: "Resume updated successfully",
  resume: updatedResume,
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const deleteResume = async (req, res) => {
  try {

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    await Resume.findByIdAndDelete(resume._id);

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const addEducation = async (req, res) => {
  try {
    const { college, degree, year } = req.body;

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    resume.education.push({
      college,
      degree,
      year,
    });

    await resume.save();

    res.status(200).json({
      success: true,
      message: "Education added successfully",
      education: resume.education,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const addExperience = async (req, res) => {
  try {
    const { company, role, duration } = req.body;

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    resume.experience.push({
      company,
      role,
      duration,
    });

    await resume.save();

    res.status(200).json({
      success: true,
      message: "Experience added successfully",
      experience: resume.experience,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const updateExperience = async (req, res) => {
  try {

    const { id } = req.params;
    const { company, role, duration } = req.body;

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const experience = resume.experience.id(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    if (company !== undefined) experience.company = company;
    if (role !== undefined) experience.role = role;
    if (duration !== undefined) experience.duration = duration;

    await resume.save();

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      experience,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const addProject = async (req, res) => {
  try {

    const {
      title,
      description,
      technologies,
      github,
      liveDemo,
    } = req.body;

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    resume.projects.push({
      title,
      description,
      technologies,
      github,
      liveDemo,
    });

    await resume.save();

    res.status(200).json({
      success: true,
      message: "Project added successfully",
      projects: resume.projects,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const updateProject = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      title,
      description,
      technologies,
      github,
      liveDemo,
    } = req.body;

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const project = resume.projects.id(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (technologies !== undefined) project.technologies = technologies;
    if (github !== undefined) project.github = github;
    if (liveDemo !== undefined) project.liveDemo = liveDemo;

    await resume.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const deleteProject = async (req, res) => {
  try {

    const { id } = req.params;

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const project = resume.projects.id(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.deleteOne();

    await resume.save();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const downloadResume = async (req, res) => {

  try {

    const resume = await Resume.findOne({
      user: req.user._id
    }).populate(
      "user",
      "name email"
    );

    if (!resume) {

      return res.status(404).json({
        success:false,
        message:"Resume not found"
      });

    }

    generateResumePDF(
      resume,
      res
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};