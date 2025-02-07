const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

// Obtener todos los productos con filtros, paginación y ordenación
router.get("/", getAllProducts);

// Obtener un producto por ID
router.get("/:pid", getProductById);

// Crear un nuevo producto
router.post("/", createProduct);

// Actualizar un producto por ID
router.put("/:pid", updateProduct);

// Eliminar un producto por ID
router.delete("/:pid", deleteProduct);

module.exports = router;