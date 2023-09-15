import { Categoria } from '../models/categoria.js';
import { Producto } from '../models/producto.js';

export async function getCategorys(req, res) {
    try {
      const categorias = await Categoria.findAll({
        attributes: ['id','usuario_id','nombre'],
      order: [['id', 'ASC']],
      });
  
      res.json(categorias);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function createCategory(req, res) {
    console.log('Creating Categoria', req.body);
    const { usuario_id,nombre  } = req.body;
    try {
      const newCategoria = await Categoria.create(
        {
          usuario_id,
          nombre,
        },
        {
          fields: ['usuario_id', 'nombre'],
        }
      );
      return res.json(newCategoria);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function getCategory(req, res) {
    const { id } = req.params;
    try {
      const categoria = await Categoria.findOne({
        where: { id },
      });
      return res.json(categoria);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function updateCategory(req, res) {
    const { id } = req.params;
    const { usuario_id,nombre } = req.body;
  
    try {
      const categoria = await Categoria.findByPk(id);
      categoria.usuario_id=usuario_id;
      categoria.nombre = nombre;
      
      await categoria.save();
  
      return res.json(categoria);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function deleteCategory(req, res) {
    const { id } = req.params;
    try {
      if (!id) {
        res.status(400).send('Category ID is required');
      }
    
      await Producto.destroy({
        where: { categoria_id: id },
      });
      
      await Categoria.destroy({
        where: { id },
      });
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function getCategoryProducts(req, res) {
    const { id } = req.params;
    try {
      const categorias = await Producto.findAll({
        attributes: ['id', 'categoria_id', 'usuario_id','nombre','precio_unitario','estado'],
        where: { categoria_id: id },
      });
      return res.json(categorias);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function getCategorysProducts(req, res) {
    try {
      const categorias = await Categoria.findAll({
        attributes: ['id', 'usuario_id', 'nombre'],
        include: [
          {
            model: Producto,
            attributes: ['id', 'categoria_id','usuario_id','nombre','precio_unitario','estado'],
            required: true,
          },
        ],
      });
      res.json(categorias);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }