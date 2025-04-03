const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth');
const { obtenerDisponibles } = require('../controllers/habitacionController');

router.get('/disponibles', verificarToken, obtenerDisponibles);

module.exports = router;
