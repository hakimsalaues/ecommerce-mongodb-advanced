let products = [
    {
        id: 1,
        title: "Guppy",
        description: "El Guppy es un pequeño pez colorido ideal para acuarios de agua dulce. Es fácil de cuidar y muy resistente.",
        code: "LP001",
        price: 1500,
        stock: 10,
        category: "Mascota",
        thumbnails: [],
        status: true,
    },
    {
        id: 2,
        title: "Flower horn",
        description: "El Flower horn es un pez exótico conocido por su cabeza prominente y su carácter territorial.",
        code: "MS002",
        price: 25,
        stock: 50,
        category: "Mascota",
        thumbnails: [],
        status: true,
    },
    {
        id: 3,
        title: "Betas",
        description: "Los Betas son peces vibrantes y populares en acuarios domésticos. Tienen aletas largas y una gran variedad de colores.",
        code: "MN003",
        price: 300,
        stock: 20,
        category: "Mascota",
        thumbnails: [],
        status: true,
    },
    {
        id: 4,
        title: "Gold fish",
        description: "El clásico Gold Fish es un pez ideal para acuarios o estanques. Es muy resistente y fácil de cuidar.",
        code: "TK004",
        price: 100,
        stock: 30,
        category: "Mascota",
        thumbnails: [],
        status: true,
    },
    {
        id: 5,
        title: "Filtro de acuario mediano",
        description: "Filtro con capacidad de hasta 20L de purificacion por hora.",
        code: "AD005",
        price: 120,
        stock: 15,
        category: "Accesorios",
        thumbnails: [],
        status: true,
    },
    {
        id: 6,
        title: "Acuario mediano",
        description: "Acuario con capacidad de hasta 35L.",
        code: "SG006",
        price: 200,
        stock: 5,
        category: "Muebles",
        thumbnails: [],
        status: true,
    },
    {
        id: 7,
        title: "Controlador de temperatura Smart",
        description: "Este controlador tiene la cualidad de poder controlar la temperatura del agua de forma inteligente pudiendolo configurar desde el celular",
        code: "SP007",
        price: 800,
        stock: 25,
        category: "Tecnología",
        thumbnails: [],
        status: true,
    },
    {
        id: 8,
        title: "pellets para pez M",
        description: "estos pellets son perfectos llenos de vitaminas y nutrientes especiales para peces medianos ",
        code: "SP007",
        price: 800,
        stock: 25,
        category: "Alimentos",
        thumbnails: [],
        status: true,
    },
];

let productId = 9; // Para continuar con el ID siguiente.

const getAllProducts = (req, res) => {
    const limit = parseInt(req.query.limit);
    if (limit && limit > 0) {
        return res.json(products.slice(0, limit));
    }
    res.json(products);
};

const getProductById = (req, res) => {
    const { pid } = req.params;
    const product = products.find(p => p.id === parseInt(pid));
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
};

const createProduct = (req, res) => {
    const { title, description, code, price, stock, category, thumbnails, status = true } = req.body;

    if (!title || !description || !code || !price || stock === undefined || !category) {
        return res.status(400).json({ error: "Todos los campos son obligatorios, excepto thumbnails" });
    }

    const newProduct = {
        id: productId++,
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails: thumbnails || [],
        status,
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    const { pid } = req.params;
    const productIndex = products.findIndex(p => p.id === parseInt(pid));
    if (productIndex === -1) return res.status(404).json({ error: "Producto no encontrado" });

    const { id, ...updates } = req.body;
    products[productIndex] = { ...products[productIndex], ...updates };
    res.json(products[productIndex]);
};

const deleteProduct = (req, res) => {
    const { pid } = req.params;
    const productIndex = products.findIndex(p => p.id === parseInt(pid));
    if (productIndex === -1) return res.status(404).json({ error: "Producto no encontrado" });

    products.splice(productIndex, 1);
    res.status(204).send();
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};