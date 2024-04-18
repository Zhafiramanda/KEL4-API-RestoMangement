const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    // Validation
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields.",
      });
    }
    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.render("error", {
        message: "Email already registered. Please login.",
      });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const newUser = new userModel({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("New user registered:", newUser);
    // Return success response
    return res.render("partials/register-success");
  } catch (error) {
    console.error("Error in registerController:", error);
    // Render error page
    return res.render("error", {
      message: "Error in registration. Please try again later.",
    });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validfatuion
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please PRovide EMail OR Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};

// Fungsi untuk validasi email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

module.exports = {
  registerController,
  loginController,
};
