import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  // Generate JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });

  // Send token in a cookie to the client
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Token will expire in 7 days (in milliseconds)
    httpOnly: true, // Prevents access to the cookie from JavaScript (XSS protection)
    sameSite: "strict", // CSRF protection (prevents the cookie from being sent on cross-origin requests)
    secure: process.env.NODE_ENV !== "development", // Only set the cookie over HTTPS in production
  });

  // Optionally, you can send a response back with success
  res.status(200).json({ message: "Token generated and sent in cookie." });
};
