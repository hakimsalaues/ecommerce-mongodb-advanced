const Product = require("../models/product");

// Obtener todos los productos con filtros paginacion y ordenacion
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, stock, category } = req.query;

    const query = {};
    if (stock) query.stock = { $gte: parseInt(stock) }; // Filtro por disponibilidad
    if (category) query.category = category; // Filtro por categoría

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort ? { [sort]: 1 } : {}, // Orden ascendente por campo
    };

    const products = await Product.paginate(query, options);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos", details: error.message });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto", details: error.message });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const { title, price, description, category, stock, thumbnail } = req.body;

    if (!title || !price || !description || !category || stock === undefined) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const newProduct = new Product({ title, price, description, category, stock, thumbnail });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto", details: error.message });
  }
};

// Actualizar un producto por ID
const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto", details: error.message });
  }
};

// Eliminar un producto por ID
const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto", details: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
