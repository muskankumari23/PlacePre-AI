import Resume from "../models/Resume.js";

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