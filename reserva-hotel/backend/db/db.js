// 📁 backend/db/db.js

const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables de entorno

const sequelize = new Sequelize(
  process.env.DB_NAME || 'reservas_hotel',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'Kunashgikun.1',
  {
    host: process.env.DB_HOST || 'localhost',
    port: 5432, // ← Puerto real de PostgreSQL, no confundas con el del servidor Express
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true'
        ? {
            require: true,
            rejectUnauthorized: false
          }
        : false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
