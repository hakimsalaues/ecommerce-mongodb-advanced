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

const addProductToCart = (req, res) => {
    const { cid, pid } = req.params;
    const cart = carts.find(c => c.id === parseInt(cid));
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const product = products.find(p => p.id === parseInt(pid));
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    const cartProduct = cart.products.find(p => p.product === parseInt(pid));
    if (cartProduct) {
        cartProduct.quantity++;
    } else {
        cart.products.push({ product: product.id, quantity: 1 });
    }

    res.status(201).json(cart);
};

module.exports = {
    createCart,
    getCartById,
    addProductToCart,
};