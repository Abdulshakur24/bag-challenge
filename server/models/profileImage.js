const mongoose = require("mongoose");

const profileImages = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  profileUrl: { type: String, trim: true },
});

module.exports = mongoose.model("ProfileImages", profileImages);
