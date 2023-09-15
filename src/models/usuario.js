import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Categoria } from './categoria.js';
import { Producto } from './producto.js';
export const Usuario = sequelize.define(
'usuarios',
 { id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  //allowNull: false
},
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'nombre del usuario',
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Correo del usuario',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Contraseña del usuario',
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Estado del usuario',
  },

 }
    );    

    Usuario.hasMany(Categoria, {
      foreignKey: { 
        name: 'usuario_id',
        allowNull:false
      }
      ,sourceKey: 'id',
    });

    Categoria.belongsTo(Usuario,{ 
      foreignKey: 'usuario_id',
      targetKey: 'id',
    });

    Usuario.hasMany(Producto, {
      foreignKey: { 
      name:'usuario_id',
      allowNull:false
      }
      ,sourceKey: 'id',
    });

    Producto.belongsTo(Usuario, {
      foreignKey: 'usuario_id',
      targetKey: 'id',
    });