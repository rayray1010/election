const express = require("express");
const router = require("./router/router");
module.exports = function expressServer() {
  const app = express();

  // load bodyParser
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ extended: true }));
  app.use("/", router);
  app.use(function (req, res) {
    res.status(404).json({ error: "無法處理請求，請聯繫作者！" });
  });
  return app;
};
