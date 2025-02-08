const express = require('express');
const router = express.Router();
const { 
  createCart, 
  getCartById, 
  addProductToCart, 
  deleteProductFromCart, 
  updateCart, 
  updateProductQuantity, 
  clearCart 
} = require('../controllers/carts');

// Ruta para crear un carrito
router.post('/', createCart); 
// Ruta para obtener un carrito por ID
router.get('/:cid', getCartById);
// Ruta para agregar un producto a un carrito
router.post('/:cid/products/:pid', addProductToCart);
// Ruta para eliminar un producto de un carrito
router.delete('/:cid/products/:pid', deleteProductFromCart);
// Ruta para actualizar un carrito completo
router.put('/:cid', updateCart);
// Ruta para actualizar la cantidad de un producto en un carrito
router.put('/:cid/products/:pid', updateProductQuantity);
// Ruta para vaciar un carrito
router.delete('/:cid', clearCart);

module.exports = router;
