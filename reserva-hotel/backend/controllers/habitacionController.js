const db = require('../db/db');

async function obtenerDisponibles(req, res) {
    try {
        const [habitaciones] = await db.query(`
            SELECT h.*, t.nombre AS tipo, ho.nombre AS hotel
            FROM habitaciones h
            JOIN tipo_habitacion t ON h.id_tipo = t.id_tipo
            JOIN hoteles ho ON h.id_hotel = ho.id_hotel
            WHERE h.estado = 'disponible'
        `);
        
        console.log("📦 Habitaciones disponibles:", habitaciones);
        res.json(habitaciones);
        
    } catch (err) {
        console.error("❌ Error al obtener habitaciones:", err); // 👈 Y ESTO
        res.status(500).json({ mensaje: 'Error al obtener habitaciones' });
    }
}

module.exports = { obtenerDisponibles };
