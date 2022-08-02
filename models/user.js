const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    email: {
      require: true,
      type: String,
    },
    name: {
      require: true,
      type: String,
    },
    IdNumber: {
      require: true,
      type: String,
    },
    votedRecord: {
      type: [{ electionId: String, candidateId: String }],
      default: [],
    },
  },
  { collection: "user", timestamps: true }
);

const model = mongoose.model("User", Schema);
module.exports = model;
