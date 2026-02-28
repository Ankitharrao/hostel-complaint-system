const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", (req, res, next) => {
  console.log("body:", req.body);
  console.log("content-type:", req.headers["content-type"]);
  next();
}, login);

module.exports = router;
