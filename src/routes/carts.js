const express = require('express');
const{
    createCart,
    getCartById,
    addProductToCart
} = require('../controllers/carts');

const router = express.Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/cid/product/:pid', addProductToCart);
module.exports = router;
