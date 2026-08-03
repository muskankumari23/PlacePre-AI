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

    const {
      keyword,
      location,
      jobType,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (keyword) {
      query.title = {
        $regex: keyword,
        $options: "i",
      };
    }

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    const totalJobs = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .populate("company", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
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

        const alreadyApplied = await Application.findOne({

            student: req.user._id,

            job: id,

        });

        if (alreadyApplied) {

            return res.status(400).json({

                success: false,

                message: "Already applied",

            });

        }

        const resume = await Resume.findOne({

            user: req.user._id,

        });

        const application = await Application.create({

            student: req.user._id,

            job: id,

            resume: resume?._id,

        });

        res.status(201).json({

            success: true,

            message: "Application submitted",

            application,

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

export const updateJob = async (req, res) => {
  try {

    const { id } = req.params;

    const job = await Job.findById(id);

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
        message: "Not authorized to update this job",
      });
    }

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

    if (title !== undefined) job.title = title;
    if (description !== undefined) job.description = description;
    if (skills !== undefined) job.skills = skills;
    if (location !== undefined) job.location = location;
    if (salary !== undefined) job.salary = salary;
    if (experience !== undefined) job.experience = experience;
    if (jobType !== undefined) job.jobType = jobType;
    if (deadline !== undefined) job.deadline = deadline;

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
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
export const deleteJob = async (req, res) => {
  try {

    const { id } = req.params;

    const job = await Job.findById(id);

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
        message: "Not authorized to delete this job",
      });
    }

    await Job.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
