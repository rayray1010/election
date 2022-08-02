const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "election", timestamps: true }
);

const model = mongoose.model("election", Schema);
module.exports = model;
