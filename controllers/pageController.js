// REGISTER
const registerForm = async (req, res) => {
  res.render("register");
};

// LOGIN
const loginForm = async (req, res) => {
  res.render("login");
};

module.exports = {
  registerForm,
  loginForm,
};
