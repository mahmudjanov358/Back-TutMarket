// <==========> <==========> <==========>
// Imports Point
// <==========> <==========> <==========>
const { Product, Cart, Favorite, sequelize } = require("../models/main");

// <==========> <==========> <==========>
// Create Product Point
// <==========> <==========> <==========>
exports.createProduct = async (req, res) => {
  try {
    const rawPrice = req.body.price;
    const priceInt = parseInt(String(rawPrice).replace(/[^0-9]/g, ""), 10);
    const payload = {
      ...req.body,
      price: Number.isNaN(priceInt) ? 0 : priceInt,
    };
    const product = await Product.create(payload);
    return res.status(201).json({
      success: true,
      message: "Product qo'shildi!",
    });
  } catch (error) {
    console.error("createProduct error", error);
    return res.status(500).json({ message: "createProduct error" });
  }
};

// <==========> <==========> <==========>
// Get Products Point
// <==========> <==========> <==========>
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    const formatted = products.map((p) => ({
      ...p.toJSON(),
      price: `${p.price} so'm`,
    }));
    return res
      .status(200)
      .json({
        success: true,
        message: "Products ro'yxati: ",
        products: formatted,
      });
  } catch (error) {
    console.error("getProducts error", error);
    return res.status(500).json({ message: "getProducts error" });
  }
};

// <==========> <==========> <==========>
// Get Product By Pk Point
// <==========> <==========> <==========>
exports.getProductByPk = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product topilmadi!" });
    }
    const formatted = { ...product.toJSON(), price: `${product.price} so'm` };
    return res
      .status(200)
      .json({ success: true, message: "Product: ", product: formatted });
  } catch (error) {
    console.error("getProductByPk error", error);
    return res.status(500).json({ message: "getProductByPk error" });
  }
};

// <==========> <==========> <==========>
// Update Product Point
// <==========> <==========> <==========>
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product topilmadi!" });
    }
    const rawPrice = req.body.price;
    const hasPrice = Object.prototype.hasOwnProperty.call(req.body, "price");
    const priceInt = hasPrice
      ? parseInt(String(rawPrice).replace(/[^0-9]/g, ""), 10)
      : undefined;
    const payload = hasPrice
      ? {
          ...req.body,
          price: Number.isNaN(priceInt) ? product.price : priceInt,
        }
      : { ...req.body };
    await product.update(payload);
    return res
      .status(200)
      .json({ success: true, message: "Product yangilandi!" });
  } catch (error) {
    console.error("updateProduct error", error);
    return res.status(500).json({ message: "updateProduct error" });
  }
};

// <==========> <==========> <==========>
// Delete Product Point
// <==========> <==========> <==========>
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product topilmadi!" });
    }
    // Remove dependent rows first to avoid FK constraint errors (Carts_product_id_fkey, Favorites_product_id_fkey)
    await sequelize.transaction(async (t) => {
      await Cart.destroy({ where: { product_id: product.id }, transaction: t });
      await Favorite.destroy({ where: { product_id: product.id }, transaction: t });
      await product.destroy({ transaction: t });
    });
    return res
      .status(200)
      .json({ success: true, message: "Product o'chirildi!" });
  } catch (error) {
    console.error("deleteProduct error", error);
    return res.status(500).json({ message: "deleteProduct error" });
  }
};
