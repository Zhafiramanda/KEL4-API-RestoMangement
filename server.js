const express = require("express");
const colors = require("colors");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

dotenv.config();

connectDb();

// Membuat aplikasi Express
const app = express();

// Static Files
app.use(express.static("public"));

// Express Session
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Flash Messages
app.use(flash({ sessionKeyName: "flashMessage" }));

// Parsing Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Menggunakan middleware
app.use(cors());
app.use(morgan("dev"));

// Templating Engine
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

// Middleware for Flash Messages
app.use((req, res, next) => {
  res.locals.flashMessage = req.flash("flashMessage");
  next();
});

// Route untuk URL root
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

// app.get("/public/scripts/register.js", function (req, res) {
//   res.set("Content-Type", "application/javascript");
//   // Mengirimkan file JavaScript
// });


// Render EJS template for the root URL
// app.get("/", (req, res) => {
//   res.render("index", { title: "Food Server APP API BASE PROJECT" });
// });

// Handle 404
// app.get("*", (req, res) => {
//   res.status(404).render("404");
// });

const PORT = process.env.PORT || 5000;

// koneksi port
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.yellow.bgWhite);
});
