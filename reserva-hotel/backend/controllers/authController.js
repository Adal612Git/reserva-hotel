const db = require('../db/db');
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const result = await db.query(
            'SELECT * FROM usuarios WHERE email = $1',
            {
                bind: [email],
                type: QueryTypes.SELECT
            }
        );

        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        const usuario = result[0];

        // Validación simple
        if (password !== usuario.password_hash) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Generar token
        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensaje: 'Error en el login' });
    }
}

async function register(req, res) {
    const { nombre, email, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.status(400).json({ mensaje: 'Las contraseñas no coinciden' });
    }
  
    try {
      const usuarioExistente = await db.query(
        'SELECT * FROM usuarios WHERE email = $1',
        {
          bind: [email],
          type: QueryTypes.SELECT
        }
      );
  
      if (usuarioExistente.length > 0) {
        return res.status(400).json({ mensaje: 'El email ya está registrado' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await db.query(
        'INSERT INTO usuarios (nombre, email, password_hash, id_rol) VALUES ($1, $2, $3, $4)',
        {
          bind: [
            nombre, // Necesitas obtener este valor del frontend o establecer un default
            email,
            hashedPassword,
            2 // Asume que 2 es el id_rol para usuarios comunes (ajústalo según tu sistema)
          ],
          type: QueryTypes.INSERT
        }
      );
  
      return res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

module.exports = { login, register }; 