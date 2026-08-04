import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["Full-Time", "Internship", "Part-Time", "Remote"],
      default: "Full-Time",
    },

    experience: {
      type: String,
      default: "Fresher",
    },

    salary: {
      type: String,
    },

    skills: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
      required: true,
    },

    lastDate: {
      type: Date,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;