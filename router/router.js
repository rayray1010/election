const express = require("express");
const router = express.Router();
const user = require("./userRouter");
router.route("/").get((req, res) => {
  return res.send("Hello World!");
});
const admin = require("./adminRouter");
router.get("/", (req, res) => res.send("Hello world!"));
router.use("/user", user);
router.use("/admin", admin);

module.exports = router;
