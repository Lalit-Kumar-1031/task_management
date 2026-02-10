const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 Character"],
      maxlength: [50, "Name must ve less than 50 Character"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [8, "Password must be at least 8 character"],
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
