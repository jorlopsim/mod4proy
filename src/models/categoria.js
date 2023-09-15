import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Producto } from './producto.js';

export const Categoria = sequelize.define('categorias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

Categoria.hasMany(Producto, {
  foreignKey: { 
    name:'categoria_id',
    allowNull:false
    }
  ,sourceKey: 'id',
});

Producto.belongsTo(Categoria, {
  foreignKey: 'categoria_id',
  targetKey: 'id',
});