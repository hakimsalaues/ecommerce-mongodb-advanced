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

// Rutas de carrito
router.get('/:cid', getCartById);
router.post('/:cid/products/:pid', addProductToCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', clearCart);

module.exports = router;
