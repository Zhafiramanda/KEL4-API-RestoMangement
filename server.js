const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

dotenv.config();

connectDb();

// Membuat aplikasi Express
const app = express();

// Menggunakan middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Route untuk URL root

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Welcome to Food Server APP API BASE PROJECT </h1>");
});

const PORT = process.env.PORT || 5000;

// Mendengarkan koneksi di port yang ditentukan
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.yellow.bgWhite);
});
