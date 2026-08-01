import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {

    let token;

    // Token Authorization Header se milega
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, No Token",
      });
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User Find
    req.user = await User.findById(decoded.id).select("-password");

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Token Failed",
    });

  }
};