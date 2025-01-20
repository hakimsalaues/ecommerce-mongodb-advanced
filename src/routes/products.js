const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Obtener todos los productos
router.get('/', async (req, res) => {
  const products = await db.getProducts();
  res.json(products);
});

// Crear un producto
router.post('/', async (req, res) => {
  const product = req.body;
  await db.addProduct(product);
  res.status(201).json({ message: 'Producto agregado con éxito' });
});

module.exports = router;
