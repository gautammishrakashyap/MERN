import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,  // Removes any leading/trailing spaces
      lowercase: true, // Ensures the email is in lowercase
    },
    fullName: {
      type: String,
      required: true,
      trim: true, // Removes any leading/trailing spaces
    },
    password: {
      type: String,
      required: true,
      minlength: 6,  // You can adjust the password length
    },
    profilePic: {
      type: String,
      default: "", // Stores URL or path to the profile picture
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a model from the schema
const User = mongoose.model("User", userSchema);

export default User;
