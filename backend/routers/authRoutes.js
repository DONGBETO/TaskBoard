const express = require("express");
const { registerUser, loginUser, getRegister, getLogin, getDashboard} = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the auth route!");
});

router.get("/register", getRegister);
router.get("/login", getLogin);

// router.get("/dashobard", getDashboard);

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
