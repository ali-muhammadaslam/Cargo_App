import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    // ✅ Check for token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Get user from DB (without password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next(); // ✅ move to next middleware
    }

    // ❌ No token case
    return res.status(401).json({ message: "Not authorized, no token" });
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
