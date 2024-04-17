const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  getFoodByIdController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const roleAuthorizationMiddleware = require("../middlewares/roleAuthorizationMiddleware");

const router = express.Router();

//routes
//CREATE FOOD
router.post("/create", authMiddleware, createFoodController);

//GET ALL FOOD
router.get("/getAll", getAllFoodsController);

// GET FOOD BY ID
router.get("/get/:id", getFoodByIdController);

// GET  FOOD by rest
router.get("/getByResturant/:id", getFoodByRestaurantController);

// UPDATE FOOD
router.put("/update/:id", authMiddleware, updateFoodController);

// DELETE FOOD
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// PLACE ORDER
router.post("/placeorder", authMiddleware, placeOrderController);

// ORDER STATUS
router.post(
  "/orderStatus/:id",
  authMiddleware,
  roleAuthorizationMiddleware,
  orderStatusController
);

module.exports = router;
