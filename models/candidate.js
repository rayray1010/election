const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    userId: {
      require: true,
      type: String,
    },
    name: {
      require: true,
      type: String,
    },
    beVotedList: {
      type: [String],
      default: [],
    },
    electionId: {
      require: true,
      type: String,
    },
  },
  { collection: "candidate", timestamps: true }
);

const model = mongoose.model("candidate", Schema);
module.exports = model;
