import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const getCompanyJobs = async (req, res) => {
  try {

    const jobs = await Job.find({
      company: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("company", "name email");

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
export const getJobApplicants = async (req, res) => {
  try {

    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Ownership Check
    if (job.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const applications = await Application.find({
      job: jobId,
    })
      .populate("student", "name email role")
      .populate("resume")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};