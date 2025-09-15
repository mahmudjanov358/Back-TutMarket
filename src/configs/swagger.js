// ==============================
// Imports Point
// ==============================
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

// ==============================
// Options Point
// ==============================
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tut Market with Swagger",
      version: "1.0.0",
      description: "Yakuniy Imtihon uchun API bilan Tut Market platformasi",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: "http://localhost:4001",
        description: "Local Development Server",
      },
    ],
    tags: [
      { name: "Cart", description: "Savat bo'limi" },
      { name: "Category", description: "Kategoriyalar" },
      { name: "Favorite", description: "Sevimli bo'limi" },
      { name: "Product", description: "Mahsulotlar" },
      { name: "Profil", description: "Profil bo'limi" },
      { name: "Slide", description: "Slider bo'limi" },
    ],
  },
  apis: [path.resolve(__dirname, "../routers/*.js")],
};

// ==============================
// Swagger Instance
// ==============================
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// ==============================
// Setup Point
// ==============================
const setupSwagger = (server) => {
  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

// ==============================
// Export Point
// ==============================
module.exports = setupSwagger;
