import express from 'express';
import morgan from 'morgan';
const app = express();

// Import routes
import usuarioRoutes from './routes/usuario.routes.js';
import productoRoutes from './routes/producto.routes.js';
import categoriaRoutes from './routes/categoria.routes.js';
// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/usuarios',usuarioRoutes);
app.use('/api/productos',productoRoutes);
app.use('/api/categorias',categoriaRoutes);
export default app;

