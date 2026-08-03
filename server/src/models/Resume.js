import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      default: "My Resume",
    },

    summary: {
      type: String,
      default: "",
    },
phone: {
  type: String,
  default: "",
},

address: {
  type: String,
  default: "",
},

linkedin: {
  type: String,
  default: "",
},

github: {
  type: String,
  default: "",
},

portfolio: {
  type: String,
  default: "",
},

profileImage: {
  type: String,
  default: "",
},
    skills: [
      {
        type: String,
      },
    ],

    education: [
      {
        college: String,
        degree: String,
        year: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        duration: String,
      },
    ],

   projects: [
  {
    title: String,
    description: String,

    technologies: [
      {
        type: String,
      },
    ],

    github: String,

    liveDemo: String,
    },
   ],
  
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;