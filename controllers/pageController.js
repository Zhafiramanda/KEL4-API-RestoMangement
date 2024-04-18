// REGISTER
const registerForm = async (req, res) => {
  res.render("register");
};

// LOGIN
const loginForm = async (req, res) => {
  res.render("login");
};
const adminDashboard = async (req, res) => {
  res.render("role/admin");
};
const staffDashboard = async (req, res) => {
  res.render("role/staff");
};
const managerDashboard = async (req, res) => {
  res.render("role/manager");
};

module.exports = {
  registerForm,
  loginForm,
  adminDashboard,
  staffDashboard,
  managerDashboard,
};
