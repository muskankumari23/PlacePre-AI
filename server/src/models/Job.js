import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    location: {
      type: String,
      default: "",
    },

    salary: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    jobType: {
      type: String,
      enum: [
        "Internship",
        "Full-Time",
        "Part-Time",
        "Remote",
      ],
      default: "Internship",
    },

    deadline: {
      type: Date,
    },

    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);