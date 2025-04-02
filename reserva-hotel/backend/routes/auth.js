const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');
const pool = require('../db/db');

// Validaciones para registro
const validateRegister = [
  body('email')
    .isEmail().withMessage('Formato inválido')
    .custom(async (email) => {
      const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
      if (user.rows.length > 0) {
        throw new Error('Email ya registrado');
      }
    }),
  body('password')
    .isLength({ min: 6 }).withMessage('Contraseña muy corta')
];

router.post('/register', validateRegister, register);
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], login);

module.exports = router;
