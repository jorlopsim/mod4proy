import { Producto } from '../models/producto.js';

export async function getProducts(req, res) {
    try {
      const productos = await Producto.findAll({
        attributes: ['id','usuario_id','categoria_id','nombre','precio_unitario','estado'],
      order: [['id', 'ASC']],
      });
  
      res.json(productos);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function createProduct(req, res) {
    console.log('Creating Productos', req.body);
    const { usuario_id, categoria_id, nombre, precio_unitario, estado  } = req.body;
    try {
      const newProducto = await Producto.create(
        {
          usuario_id,
          categoria_id,
          nombre,
          precio_unitario,
          estado,
        },
        {
          fields: ['usuario_id', 'categoria_id','nombre','precio_unitario','estado'],
        }
      );
      return res.json(newProducto);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function getProduct(req, res) {
    const { id } = req.params;
    try {
      const producto = await Producto.findOne({
        where: { id },
      });
      return res.json(producto);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function updateProduct(req, res) {
    const { id } = req.params;
    const { usuario_id, categoria_id, nombre, precio_unitario, estado  } = req.body;
  
    try {
      const producto = await Producto.findByPk(id);
      producto.usuario_id=usuario_id;
      producto.categoria_id=categoria_id;
      producto.nombre=nombre;
      producto.precio_unitario = precio_unitario;
      producto.estado=estado;
      
      await producto.save();
  
      return res.json(producto);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
      if (!id) {
        res.status(400).send('Product ID is required');
      }
    
      await Producto.destroy({
        where: { id },
      });
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }