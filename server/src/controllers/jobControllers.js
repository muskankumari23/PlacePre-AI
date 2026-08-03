import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {

    const {
      title,
      description,
      skills,
      location,
      salary,
      experience,
      jobType,
      deadline,
    } = req.body;

    const job = await Job.create({
      company: req.user._id,
      title,
      description,
      skills,
      location,
      salary,
      experience,
      jobType,
      deadline,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const getAllJobs = async (req, res) => {
  try {

    const jobs = await Job.find()
      .populate("company", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getJobById = async (req, res) => {
  try {

    const { id } = req.params;

    const job = await Job.findById(id)
      .populate("company", "name email role")
      .populate("applicants", "name email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const applyJob = async (req, res) => {
  try {

    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check duplicate application
    const alreadyApplied = job.applicants.some(
  (applicant) => applicant.toString() === req.user._id.toString()
);

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    job.applicants.push(req.user._id);

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job applied successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const getAppliedJobs = async (req, res) => {
  try {

    const jobs = await Job.find({
      applicants: req.user._id,
    })
      .populate("company", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};