const express = require('express');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');

const app= express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products',productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(PORT,() => {
    console.log ('Servidor escuchando en http://localhost:8080/api/products/1');
});