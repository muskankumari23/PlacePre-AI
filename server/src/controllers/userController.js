import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ================= Get All Users (Admin Only) =================

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get Profile =================

export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user,
  });
};

// ================= Update Profile =================

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      name,
      password,
      skills,
      education,
      experience,
      careerPreferences,
    } = req.body;

    // NOTE: req.body.role is intentionally ignored
    // Users cannot modify their own role — this is a security measure

    // Update Name
    if (name) {
      user.name = name.trim();
    }

    // Update Password
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters",
        });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Update Skills
    if (skills !== undefined) {
      user.skills = skills;
    }

    // Update Education
    if (education !== undefined) {
      user.education = education;
    }

    // Update Experience
    if (experience !== undefined) {
      user.experience = experience;
    }

    // Update Career Preferences
    if (careerPreferences !== undefined) {
      user.careerPreferences = {
        ...user.careerPreferences?.toObject?.() || {},
        ...careerPreferences,
      };
    }

    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(user._id).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};