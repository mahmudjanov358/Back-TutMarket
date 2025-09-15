// ==============================
// Imports Point
// ==============================
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/configs/database");
const setupSwagger = require("./src/configs/swagger");
const cartRoutes = require("./src/routers/cart.routes");
const categoryRoutes = require("./src/routers/category.routes");
const favoriteRoutes = require("./src/routers/favorite.routes");
const productRoutes = require("./src/routers/product.routes");
const profilRoutes = require("./src/routers/profil.routes");
const slideRoutes = require("./src/routers/slide.routes");
require("dotenv").config();

// ==============================
// Special Settings Point
// ==============================
const server = express();
server.use(express.json());
server.use(cors());
setupSwagger(server);

// ==============================
// Routers Points
// ==============================
server.use("/cart", cartRoutes);
server.use("/category", categoryRoutes);
server.use("/favorite", favoriteRoutes);
server.use("/product", productRoutes);
server.use("/profil", profilRoutes);
server.use("/slide", slideRoutes);

// ==============================
// Server Point
// ==============================
const PORT = process.env.PORT || 4001;
sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Server is not running", error);
  })
  .finally(() => {
    console.log("Server is running");
  });
