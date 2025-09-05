# Ecommerce MongoDB Advanced 🛒

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Handlebars](https://img.shields.io/badge/Handlebars-f0772b?style=for-the-badge&logo=handlebars&logoColor=white)

Backend profesional para un sistema de **ecommerce** con gestión completa de productos y carritos, utilizando **MongoDB** como base de datos principal y **Express.js** como framework.

---

## 🔹 Funcionalidades

### Productos
- Consultas con filtros por **categoría** y **disponibilidad**.
- Paginación y ordenamiento ascendente/descendente por precio.
- Endpoint `GET /products` con soporte para query params:
  - `limit` → cantidad de productos por página (default: 10)
  - `page` → número de página (default: 1)
  - `sort` → ordenamiento `asc` / `desc` por precio
  - `query` → filtro de búsqueda
- Respuesta con información completa de paginación y links a páginas previas/siguientes.
- Vistas de productos:
  - Listado paginado (`/products`)  
  - Detalle de producto (`/products/:pid`) con botón para agregar al carrito

### Carritos
- CRUD completo de carritos:
  - `DELETE /api/carts/:cid/products/:pid` → eliminar producto
  - `PUT /api/carts/:cid` → actualizar carrito completo
  - `PUT /api/carts/:cid/products/:pid` → actualizar solo cantidad
  - `DELETE /api/carts/:cid` → eliminar todos los productos
- Relación con productos mediante `populate` para obtener datos completos.
- Vista de carrito específico (`/carts/:cid`) mostrando solo los productos de ese carrito.

### Vistas
- Handlebars para renderizado dinámico.
- Paginación de productos en la interfaz.
- Botón “Agregar al carrito” disponible desde listado y detalle del producto.

---

## Instalación

```bash
git clone https://github.com/tu-usuario/ecommerce-mongodb-advanced.git
cd ecommerce-mongodb-advanced
npm install
npm run dev
