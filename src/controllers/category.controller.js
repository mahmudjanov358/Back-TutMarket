// <==========> <==========> <==========>
// Imports Point
// <==========> <==========> <==========>
const { Category } = require("../models/main");

// <==========> <==========> <==========>
// Create Category Point
// <==========> <==========> <==========>
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res
      .status(200)
      .json({ success: true, message: "Kategoriya qo'shildi!" });
  } catch (error) {
    console.error("createCategory error", error);
    return res.status(500).json({ message: "createCategory error" });
  }
};

// <==========> <==========> <==========>
// Get Categories Point
// <==========> <==========> <==========>
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res
      .status(200)
      .json({ success: true, message: "Kategoriyalar ro'yxati: ", categories });
  } catch (error) {
    console.error("getCategories error", error);
    return res.status(500).json({ message: "getCategories error" });
  }
};

// <==========> <==========> <==========>
// Get Category By Pk Point
// <==========> <==========> <==========>
exports.getCategoryByPk = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Kategoriya topilmadi!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Kategoriya: ", category });
  } catch (error) {
    console.error("getCategoryByPk error", error);
    return res.status(500).json({ message: "getCategoryByPk error" });
  }
};

// <==========> <==========> <==========>
// Update Category Point
// <==========> <==========> <==========>
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Kategoriya topilmadi!" });
    }
    await category.update(req.body);
    return res
      .status(200)
      .json({ success: true, message: "Kategoriya yangilandi!" });
  } catch (error) {
    console.error("updateCategory error", error);
    return res.status(500).json({ message: "updateCategory error" });
  }
};

// <==========> <==========> <==========>
// Delete Category Point
// <==========> <==========> <==========>
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Kategoriya topilmadi!" });
    }
    await category.destroy();
    return res
      .status(200)
      .json({ success: true, message: "Kategoriya o'chirildi!" });
  } catch (error) {
    console.error("deleteCategory error", error);
    return res.status(500).json({ message: "deleteCategory error" });
  }
};
