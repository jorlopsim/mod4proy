import { Usuario } from '../models/usuario.js';
import { Categoria } from '../models/categoria.js';
import { Producto } from '../models/producto.js';
import Jwt  from 'jsonwebtoken';
import { token } from 'morgan';
import 'dotenv/config.js';
import moment from 'moment';


export async function getUsers(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'nombre', 'correo', 'password','estado'],
      order: [['id', 'ASC']],
      });
  
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function createUser(req, res) {
    console.log('Creating Usuario', req.body);
    const { nombre, correo, password , estado  } = req.body;
    try {
      const newUsuario = await Usuario.create(
        {
          nombre,
          correo,
          password,
          estado,
        },
        {
          fields: ['nombre', 'correo', 'password','estado'],
        }
      );
      return res.json(newUsuario);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function getUser(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findOne({
        where: { id },
      });
      return res.json(usuario);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function updateUser(req, res) {
    const { id } = req.params;
    const { nombre, correo, password, estado } = req.body;
  
    try {
      const usuario = await Usuario.findByPk(id);
      usuario.nombre = nombre;
      usuario.correo=correo;
      usuario.password=password;
      usuario.estado=estado;
      
      await usuario.save();
  
      return res.json(usuario);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function deleteUser(req, res) {
    const { id } = req.params;
    try {
      await Categoria.destroy({
        where: { usuario_id: id },
      });
      
      await Producto.destroy({
        where: { usuario_id: id },
      });
      
      await Usuario.destroy({
        where: { id },
      });
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function getUserCategorys(req, res) {
    const { id } = req.params;
    try {
      const categorias = await Categoria.findAll({
        attributes: ['id', 'usuario_id', 'nombre'],
        where: { usuario_id: id },
      });
      return res.json(categorias);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function getUsersCategorys(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'nombre','estado'],
        include: [
          {
            model: Categoria,
            attributes: ['id', 'nombre'],
            required: true,
          },
        ],
      });
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function getUserProducts(req, res) {
    const { id } = req.params;
    try {
      const productos = await Producto.findAll({
        attributes: ['id', 'usuario_id', 'categoria_id','nombre','precio_unitario','estado'],
        where: { usuario_id: id },
      });
      return res.json(productos);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function getUsersProducts(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'nombre','estado'],
        include: [
          {
            model: Producto,
            attributes: ['id', 'categoria_id','nombre','precio_unitario','estado'],
            required: true,
          },
        ],
      });
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function genToken(req, res) {
    const { correo, password } = req.body;
    const KEY = process.env.KEY;
    try {
      const usuario = await Usuario.findOne({
        attributes: ['id', 'nombre'],
        where: { correo,password },
      });
     // return res.json(usuario);
     if (usuario!==null) {
      Jwt.sign({ usuario },KEY,{expiresIn: '600s'},(err,token)=>{
       let actual=new Date();
       let minutos=actual.getTime()+(1000*600);
       let expira=new Date(minutos);
       expira=expira.toLocaleString("es-ES",{day:"numeric",month:"2-digit", year:"2-digit",hour:'2-digit',minute:'2-digit',second:'2-digit'});
       res.json({ token, Expira: expira});
       });
      }
       else { res.status(400).send('Usuario no identificado');}
    } catch (error) {
      res.status(500).json({ 
        message: error.message,
      });
    }
  }

  export async function verifytoken(req, res,next) {
    const bearerHeader=req.headers['authorization'];
    const KEY = process.env.KEY;
    console.log('bearerHeader',bearerHeader);
    if (typeof bearerHeader!=='undefined'){
      const token=bearerHeader.split(' ')[1];
      console.log('token',token);
      Jwt.verify(token,KEY,(error,usuario)=>{
         if (error) res.sendStatus(403);
         else {
          req.usuario=usuario;
          next();
         }
      });
    } else res.sendStatus(403);
  }