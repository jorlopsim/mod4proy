import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
//import { Categoria } from './categoria.js';
export const Producto = sequelize.define(
'productos',
 { id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  //allowNull: false
},
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'nombre del producto',
  },
  precio_unitario: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    comment: 'Precio del Producto',
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

 }
    );    