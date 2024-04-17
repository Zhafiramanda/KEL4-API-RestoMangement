const express = require("express");
const {
  registerController,
  loginController,
  registerForm,
  loginForm,
} = require("../controllers/authController");

const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", registerController);
router.get("/register", registerForm);


// LOGIN || POST
router.post("/login", loginController);
router.get("/login", loginForm);

module.exports = router;
