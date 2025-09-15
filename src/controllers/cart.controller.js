// <==========> <==========> <==========>
// Imports Point
// <==========> <==========> <==========>
const { Cart, Profil, Product } = require("../models/main");

// <==========> <==========> <==========>
// Create Cart Point
// <==========> <==========> <==========>
exports.createCart = async (req, res) => {
  try {
    const profil_id = req.profil.id;
    const beforeCart = await Cart.findOne({
      where: { product_id: req.body.product_id, profil_id },
    });
    if (beforeCart) {
      await beforeCart.destroy();
      return res
        .status(200)
        .json({ success: true, message: "Savatdan o'chirildi!" });
    } else {
      await Cart.create({
        product_id: req.body.product_id,
        profil_id,
        quantity: 1,
      });
      return res
        .status(200)
        .json({ success: true, message: "Savatga qo'shildi!" });
    }
  } catch (error) {
    console.error("createCart error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "createCart error" });
  }
};

// <==========> <==========> <==========>
// Get My Cart Point
// <==========> <==========> <==========>
exports.getMyCart = async (req, res) => {
  try {
    const profil = await Profil.findByPk(req.profil.id, {
      include: [
        {
          model: Cart,
          as: "cart",
          include: [
            {
              model: Product,
              as: "cart_product",
            },
          ],
        },
      ],
    });
    const json = profil ? profil.toJSON() : null;
    if (json) {
      const normalize = (arr) =>
        Array.isArray(arr)
          ? arr.map((c) => {
              if (
                c.cart_product &&
                typeof c.cart_product.price !== "undefined"
              ) {
                c.cart_product.price = `${c.cart_product.price} so'm`;
              }
              // Align to frontend expectation: item.product should exist
              if (c.cart_product) {
                c.product = c.cart_product;
              }
              return c;
            })
          : arr;
      // Normalize and expose as `carts` (frontend checks profil.carts or Carts)
      if (Array.isArray(json.cart)) {
        const normalized = normalize(json.cart);
        json.carts = normalized;
        json.Carts = normalized;
      } else {
        if (Array.isArray(json.Carts)) json.Carts = normalize(json.Carts);
        if (Array.isArray(json.carts)) json.carts = normalize(json.carts);
      }
    }
    return res.status(200).json({
      success: true,
      message: "Mening savatim",
      profil: json || profil,
    });
  } catch (error) {
    console.error("getMyCart error: ", error);
    return res.status(500).json({ message: "getMyCart error" });
  }
};

// <==========> <==========> <==========>
// Get Carts Point
// <==========> <==========> <==========>
exports.getCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    return res
      .status(200)
      .json({ success: true, message: "Savatlar ro'yxati: ", carts });
  } catch (error) {
    console.error("getCarts error: ", error);
    return res.status(500).json({ message: "getCarts error" });
  }
};

// <==========> <==========> <==========>
// Get Cart By Pk Point
// <==========> <==========> <==========>
exports.getCartByPk = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByPk(id, {
      include: [
        { model: Profil, as: "cart_profil" },
        { model: Product, as: "cart_product" },
      ],
    });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Savat topilmadi!" });
    }
    return res.status(200).json({ success: true, message: "Savat: ", cart });
  } catch (error) {
    console.error("getCartByPk error: ", error);
    return res.status(500).json({ message: "getCartByPk error" });
  }
};

// <==========> <==========> <==========>
// Delete Cart Point
// <==========> <==========> <==========>
exports.deleteCart = async (req, res) => {
  try {
    const cart_id = req.params.id;
    const cart = await Cart.findByPk(cart_id);
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Savat topilmadi!" });
    }
    await cart.destroy();
    return res
      .status(200)
      .json({ success: true, message: "Savat o'chirildi!" });
  } catch (error) {
    console.error("deleteCart error: ", error);
    return res.status(500).json({ message: "deleteCart error" });
  }
};
