import { Sequelize } from 'sequelize';
import 'dotenv/config.js';
const dbname = process.env.dbname;
const userbd = process.env.userbd;
const passbd=process.env.passbd;
const host=process.env.host;
export const sequelize = new Sequelize(
    //'bdproymod', // db name
    dbname, // bd name
    userbd,  // username
    passbd, // password
    {
      host: host,
      dialect: 'postgres',
    }
  );