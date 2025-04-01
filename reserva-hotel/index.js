const express = require('express');
const db = require('./db'); // Asegúrate que este archivo exista
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta simple para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor corriendo 🔥');
});

// Ruta para probar conexión con la tabla "usuario"
app.get('/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuario');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al consultar usuarios:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
});
