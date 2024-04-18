const express = require("express");
const {
  registerForm,
  loginForm,
  adminDashboard,
  staffDashboard,
  managerDashboard,
} = require("../controllers/pageController");

const router = express.Router();

//routes
//REGISTER || POST
router.get("/registerForm", registerForm);

// LOGIN || POST
router.get("/loginForm", loginForm);

// DASHBOARD
router.get("/dashboard/admin", adminDashboard);
router.get("/dashboard/staff", staffDashboard);
router.get("/dashboard/manager", managerDashboard);

module.exports = router;