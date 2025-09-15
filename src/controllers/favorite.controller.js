// <==========> <==========> <==========>
// Imports Point
// <==========> <==========> <==========>
const { Favorite, Profil, Product } = require("../models/main");

// <==========> <==========> <==========>
// Create Favorite Point
// <==========> <==========> <==========>
exports.createFavorite = async (req, res) => {
  try {
    const profil_id = req.profil.id;
    const { product_id } = req.body;
    const exist = await Favorite.findOne({ where: { profil_id, product_id } });
    if (exist) {
      await exist.destroy();
      return res
        .status(200)
        .json({ success: true, message: "Sevimlilardan o'chirildi!" });
    }
    await Favorite.create({ profil_id, product_id });
    return res
      .status(200)
      .json({ success: true, message: "Sevimlilarga qo'shildi!" });
  } catch (error) {
    console.error("createFavorite error", error);
    return res.status(500).json({ message: "createFavorite error" });
  }
};

// <==========> <==========> <==========>
// Get My Favorite Point
// <==========> <==========> <==========>
exports.getMyFavorite = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 12, 1),
      100
    );
    const offset = (page - 1) * limit;

    const { count, rows } = await Favorite.findAndCountAll({
      where: { profil_id: req.profil.id },
      include: [
        {
          model: Product,
          as: "favorite_product",
          attributes: ["id", "image", "imageAlt", "title", "price"],
        },
      ],
      attributes: ["id", "product_id"],
      order: [["id", "DESC"]],
      limit,
      offset,
      distinct: true,
    });

    const favorite = rows.map((row) => {
      const json = row.toJSON();
      const { favorite_product, ...rest } = json;
      if (favorite_product && typeof favorite_product.price === "number") {
        favorite_product.price = `${favorite_product.price} so'm`;
      }
      return { ...rest, product: favorite_product };
    });

    return res.status(200).json({
      success: true,
      message: "Favoritlar ro'yxati: ",
      favorite,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.max(Math.ceil(count / limit), 1),
      },
    });
  } catch (error) {
    console.error("getMyFavorite error", error);
    return res.status(500).json({ message: "getMyFavorite error" });
  }
};

// <==========> <==========> <==========>
// Get Favorites Point
// <==========> <==========> <==========>
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll();
    return res
      .status(200)
      .json({ success: true, message: "Favoritlar ro'yxati: ", favorites });
  } catch (error) {
    console.error("getFavorites error", error);
    return res.status(500).json({ message: "getFavorites error" });
  }
};

// <==========> <==========> <==========>
// Get Favorite By Pk Point
// <==========> <==========> <==========>
exports.getFavoriteByPk = async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id, {
      include: [
        { model: Profil, as: "favorite_profil" },
        { model: Product, as: "favorite_product" },
      ],
    });
    if (!favorite) {
      return res
        .status(404)
        .json({ success: false, message: "Favorit topilmadi!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Favorit: ", favorite });
  } catch (error) {
    console.error("getFavoriteByPk error", error);
    return res.status(500).json({ message: "getFavoriteByPk error" });
  }
};

// <==========> <==========> <==========>
// Delete Favorite Point
// <==========> <==========> <==========>
exports.deleteFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    if (!favorite) {
      return res
        .status(404)
        .json({ success: false, message: "Favorit topilmadi!" });
    }
    await favorite.destroy();
    return res
      .status(200)
      .json({ success: true, message: "Favorit o'chirildi!" });
  } catch (error) {
    console.error("deleteFavorite error", error);
    return res.status(500).json({ message: "deleteFavorite error" });
  }
};
