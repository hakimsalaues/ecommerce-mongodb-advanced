const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { create } = require('express-handlebars'); 
const axios = require('axios');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Handlebars
const hbs = create({ extname: '.hbs' });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Almacén temporal de productos
let products = [];

// URL de la API 
const API_URL = 'https://fakestoreapi.com/products';

// cargar productos desde la API
const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    products = response.data;
  } catch (error) {
    console.error('Error al cargar productos desde la API:', error);
  }
};


app.use(async (req, res, next) => {
  if (!products.length) {
    await fetchProducts();
  }
  next();
});

// Rutas 
app.get('/', (req, res) => {
  res.render('home', { products });
});

app.get('/products', (req, res) => {
  res.render('products', { products });
});

// cargar productos desde la API directamente
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    products = response.data;
    res.json(products);
  } catch (error) {
    res.status(500).send('Error al obtener productos de la API');
  }
});

// WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

 
  socket.emit('updateProducts', products);

  // creación de un producto
  socket.on('addProduct', (product) => {
    products.push(product);
    io.emit('updateProducts', products); // Actualizar lista en tiempo real
  });

  // Eliminar un producto
  socket.on('deleteProduct', (productId) => {
    products = products.filter((p) => p.id !== productId);
    io.emit('updateProducts', products); // Actualizar lista en tiempo real
  });
});


const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

