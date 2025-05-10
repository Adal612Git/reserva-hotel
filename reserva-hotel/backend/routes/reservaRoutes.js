const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');

const {
  crearReserva,
  obtenerReservas,
  actualizarReserva,
  eliminarReserva
} = require('../controllers/reservaController');

router.get('/', authenticate, obtenerReservas);
router.post('/', authenticate, crearReserva);
router.put('/:id', authenticate, actualizarReserva);
router.delete('/:id', authenticate, eliminarReserva);

module.exports = router;
