const db = require('../db/db');
const { QueryTypes } = require('sequelize');

async function crearReserva(req, res) {
    const { id_habitacion, fecha_inicio, fecha_fin } = req.body;
    const id_usuario = req.usuario.id_usuario;

    try {
        // ✅ Verifica que los datos lleguen correctamente
        console.log('Datos recibidos:', {
            id_habitacion,
            fecha_inicio,
            fecha_fin,
            id_usuario
        });

        // ✅ Verificar disponibilidad
        const hab = await db.query(
            'SELECT estado FROM habitaciones WHERE id_habitacion = ?',
            {
                replacements: [id_habitacion],
                type: QueryTypes.SELECT  // 👈 Cambiado de RAW a SELECT
            }
        );

        if (hab.length === 0 || hab[0].estado !== 'disponible') {
            return res.status(400).json({ mensaje: 'Habitación no disponible' });
        }

        // ✅ Crear reserva
        const nueva = await db.query(
            `INSERT INTO reservas (id_usuario, id_habitacion, fecha_inicio, fecha_fin, id_estado)
             VALUES (?, ?, ?, ?, 1)
             RETURNING *`,
            {
                replacements: [id_usuario, id_habitacion, fecha_inicio, fecha_fin],
                type: QueryTypes.INSERT
            }
        );

        res.status(201).json(nueva[0][0]);
    } catch (err) {
        console.error('🔥 Error al crear reserva:', err);
        res.status(500).json({ mensaje: 'Error al crear reserva' });
    }
}
async function obtenerReservas(req, res) {
    res.send('Función obtenerReservas no implementada todavía');
  }
  
  async function actualizarReserva(req, res) {
    res.send('Función actualizarReserva no implementada todavía');
  }
  
  async function eliminarReserva(req, res) {
    res.send('Función eliminarReserva no implementada todavía');
  }
  
module.exports = {
    crearReserva,
    obtenerReservas,
    actualizarReserva,
    eliminarReserva
  };
  