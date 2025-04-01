require('dotenv').config(); // Carga las variables del archivo .env
const { Pool } = require('pg');

// Creamos el pool de conexión con los datos del .env
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Probar conexión
pool.connect()
  .then(client => {
    console.log('✅ Conexión exitosa a PostgreSQL');
    client.release();
  })
  .catch(err => {
    console.error('❌ Error al conectar a PostgreSQL:', err);
  });

module.exports = pool;
