const Cart = require('../models/cart');
const Product = require('../models/product');
let carts = [];
let cartId = 1;

const createCart = (req, res) => {
    const newCart = {
        id: cartId++,
        products: [],
    };

    carts.push(newCart);
    res.status(201).json(newCart);
};

const getCartById = (req, res) => {
    const { cid } = req.params;
    const cart = carts.find(c => c.id === parseInt(cid));
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart.products);
};

const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        // Verificar si el carrito existe
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Verificar si el producto existe
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.products.find(p => p.product.toString() === pid);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const deleteProductFromCart = (req, res) => {
    const { cid, pid } = req.params;
    const cart = carts.find(c => c.id === parseInt(cid));
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = cart.products.filter(p => p.product !== parseInt(pid));
    res.json(cart);
};

const updateCart = (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = carts.find(c => c.id === parseInt(cid));
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = products;
    res.json(cart);
};

const updateProductQuantity = (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = carts.find(c => c.id === parseInt(cid));
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const cartProduct = cart.products.find(p => p.product === parseInt(pid));
    if (!cartProduct) return res.status(404).json({ error: 'Producto no encontrado en el carrito' });

    cartProduct.quantity = quantity;
    res.json(cart);
};

const clearCart = (req, res) => {
    const { cid } = req.params;
    const cart = carts.find(c => c.id === parseInt(cid));
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = [];
    res.json(cart);
};

module.exports = {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductFromCart,
    updateCart,
    updateProductQuantity,
    clearCart
};
