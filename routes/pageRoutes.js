const express = require("express");
const {
  registerForm,
  loginForm,
} = require("../controllers/pageController");

const router = express.Router();

//routes
//REGISTER || POST
router.get("/registerForm", registerForm);

// LOGIN || POST
router.get("/loginForm", loginForm);

module.exports = router;