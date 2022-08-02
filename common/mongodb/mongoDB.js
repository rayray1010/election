const mongoose = require("mongoose");
const mongodbConfig = require("../../config/mongodbConfig");

mongoose.set("autoCreate", false);

exports.connectMongo = async function () {
  try {
    const result = await mongoose.connect(mongodbConfig.mongoUrl, {
      autoIndex: false,
    });
    console.log("MongoDB connect successful.");
    return result;
  } catch (err) {
    console.log(err);
    console.log("MongoDB connection failed");
    return process.exit(1);
  }
};

exports.disconnectMongo = async function () {
  await mongoose.connection.close(false);
  console.log("MongoDb connection closed.");
};
