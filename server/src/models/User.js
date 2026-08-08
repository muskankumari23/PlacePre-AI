import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["student", "company", "admin"],
      default: "student",
    },

    avatar: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    education: [
      {
        degree: { type: String },
        institution: { type: String },
        year: { type: String },
      },
    ],

    experience: [
      {
        title: { type: String },
        company: { type: String },
        duration: { type: String },
        description: { type: String },
      },
    ],

    careerPreferences: {
      preferredRoles: { type: [String], default: [] },
      preferredLocations: { type: [String], default: [] },
      expectedSalary: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;