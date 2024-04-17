const restaurantModel = require("../models/restaurantModel");

// Create restaurant
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      rating,
      ratingCount,
      code,
      location,
    } = req.body;

    // validasi
    if (!title || !location) {
      return res.status(500).send({
        success: false,
        message: "Title and location are required fields.",
      });
    }

    // Proses pembuatan restoran.
    const newRestaurant = new restaurantModel({
      title: title,
      imageUrl: imageUrl,
      foods: foods,
      time: time,
      pickup: pickup,
      delivery: delivery,
      isOpen: isOpen,
      rating: rating,
      ratingCount: ratingCount,
      code: code,
      location: location,
    });

    // Simpan restoran yang baru dibuat ke dalam database
    await newRestaurant.save();

    // Mengirim respon berhasil
    res.status(200).send({
      success: true,
      message: "Restaurant created successfully.",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating restaurant. Please try again later.",
    });
  }
};

// get all restaurant
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants || restaurants.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Restaurant list not found.",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message:
        "Failed to fetch restaurant list. There was an error on the server.",
      error: error,
    });
  }
};

// get restaurant by id
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Restaurant ID not provided.",
      });
    }
    // Temukan restoran
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found.",
      });
    }

    // Kirim respons jika restoran ditemukan
    res.status(200).send({
      success: true,
      restaurant,
      message: "Restaurant data retrieved successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching restaurant data by ID.",
      error: error,
    });
  }
};

//DELETE RESTRURNAT
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Found or Restaurant ID Not Provided",
      });
    }
    await restaurantModel.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message: "Restaurant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete restaurant API",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
