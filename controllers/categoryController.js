const categoryModel = require("../models/categoryModel");
const Category = require("../models/categoryModel"); // Pastikan mengimpor model Category

const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    // Validasi input
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Title or imageUrl are required fields",
      });
    }

    // Proses pembuatan kategori
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    // Tangani error
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create cat api",
      error: error.message,
    });
  }
};

// get all category
const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "There are no categories found.",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in get All Categpry API",
      error,
    });
  }
};

// update category
const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No category was found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update cat api",
      error,
    });
  }
};

// DLEETE CAT
const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide the ID of the category.",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No category was found with this ID.",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "The category was deleted successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Dlete Cat APi",
      error,
    });
  }
};

module.exports = {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};
