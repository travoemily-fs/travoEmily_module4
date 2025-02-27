const mongoose = require("mongoose");

const housesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "House name is required to proceed."],
      unique: true,
    },
    founder: {
      type: String,
      required: [true, "The founder name is required to proceed."],
    },
    mascot: {
      type: String,
      enum: ["Lion", "Snake", "Badger", "Eagle"],
    },
    motto: [String],
    colors: [String],
    ghost: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("House", housesSchema);
