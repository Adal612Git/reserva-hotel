require('dotenv').config();
const express = require('express');
const db = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
db.authenticate()
  .then(() => {
    console.log(`📌 Base de datos conectada: ${db.config.database}`);
  })
  .catch((err) => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });

db.sync()
  .then(() => console.log("🗄️ Tablas sincronizadas"))
  .catch((err) => console.error("❌ Error al sincronizar tablas:", err));

// Middleware
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reservas', require('./routes/reservaRoutes'));
app.use('/api/habitaciones', require('./routes/habitacionRoutes'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor corriendo 🔥');
});

app.listen(PORT, () => {
  console.log(`✅ Backend en línea: http://localhost:${PORT}`);
});
