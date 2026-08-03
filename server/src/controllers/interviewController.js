import Interview from "../models/Interview.js";
import genAI from "../config/gemini.js";

export const generateQuestions = async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    if (!role || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Role and difficulty are required",
      });
    }

    // Temporary Questions
    const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const prompt = `
Generate exactly 5 interview questions.

Role : ${role}

Difficulty : ${difficulty}

Return only the questions.

No numbering explanation.
`;

const result = await model.generateContent(prompt);

const text = result.response.text();
const questions = text.split("\n").filter((q) => q.trim() !== "");

    const interview = await Interview.create({
      user: req.user._id,
      role,
      difficulty,
      questions,
    });

    res.status(201).json({
      success: true,
      message: "Interview questions generated successfully",
      interview,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const submitAnswers = async (req, res) => {
  try {

    const { interviewId, answers } = req.body;

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    interview.answers = answers;

    // Temporary Score
    interview.score = 80;

    interview.feedback =
      "Good attempt. Improve technical explanations.";

    interview.status = "Completed";

    await interview.save();

    res.status(200).json({
      success: true,
      message: "Interview submitted successfully",
      interview,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getInterviewHistory = async (req, res) => {
  try {

    const interviews = await Interview.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getInterviewById = async (req, res) => {
  try {

    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      interview,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteInterview = async (req, res) => {
  try {

    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    await Interview.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Interview deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};