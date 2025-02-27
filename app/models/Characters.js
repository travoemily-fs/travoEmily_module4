const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Your must enter a name to proceed."],
      unique: [true, "Characters cannot share the same name."],
      trim: true,
      maxLength: [50, "Your name is too long."],
    },
    age: {
      type: Number,
      required: [true, "Student's age is required to proceed."],
      min: [11, "Students begin classes at Hogwarts at age eleven."],
    },
    house: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "House",
      required: true,
    },
    year: {
      type: Number,
      required: [true, "School year is required to proceed."],
      min: [1, "Error. Hogwarts starts with first years."],
      max: [7, "Error. Students graduate Hogwarts after their seventh year."],
    },
    bloodPurity: {
      type: String,
      required: [true, "Blood purity required to proceed."],
      enum: ["pureblood", "halfblood", "muggle born", "squib"],
    },
    wand: {
      length: {
        type: Number,
        required: [true, "Wand length is required."],
        min: [7, "A wand must be at least seven inches in length."],
        max: [18, "A wand cannot exceed more than eighteen inches in length."],
      },
      core: {
        type: String,
        required: [true, "Every wand has a core."],
      },
      wood: {
        type: String,
        required: [true, "Wand wood type is required to proceed."],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Character", characterSchema);
