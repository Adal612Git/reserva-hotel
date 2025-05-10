require('dotenv').config();
const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reservas', require('./routes/reservaRoutes')); // 👈 añadimos esta línea

// Escucha en el puerto correcto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
