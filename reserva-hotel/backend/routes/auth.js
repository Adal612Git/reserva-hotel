const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { body } = require('express-validator');

// Ruta de login (valida email y password)
router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').exists().withMessage('Contraseña requerida')
], login);

router.post('/register', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden');
    }
    return true;
  })
], register);

module.exports = router;
