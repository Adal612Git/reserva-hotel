const { DataTypes } = require('sequelize');
const db = require('../db/db');

const Reserva = db.define('reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  habitacion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'habitacion',
      key: 'id'
    }
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString().split('T')[0]
    }
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      is: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
    }
  },
  estado_reserva_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  timestamps: true,
  underscored: true,
  paranoid: true, // Para eliminación lógica
  indexes: [
    {
      fields: ['fecha', 'hora', 'habitacion_id'],
      unique: true
    }
  ]
});

module.exports = Reserva;