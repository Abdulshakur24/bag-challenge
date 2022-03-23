const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name required!"],
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email required!"],
      unique: true,
    },
    hashed_password: {
      type: String,
      required: [true, "Password required!"],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
