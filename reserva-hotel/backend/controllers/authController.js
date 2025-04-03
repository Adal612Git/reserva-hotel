const db = require('../db/db');
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

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

module.exports = { login };
