import User from "../models/user.model.js";  // Adjust the path if necessary
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  
  try {
    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,  // Save the hashed password
    });

    // Save the user to the database
    await newUser.save();

    // Send a response back to the client
    res.status(201).json({ message: "User created successfully", newUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Login successful, you can add JWT or session management here if needed
    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const logout = (req, res) => {
  // Logic for logging out a user (e.g., clearing a cookie or invalidating a token)
  res.status(200).json({ message: "Logout successful" });
};
