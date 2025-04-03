const { Sequelize, DataTypes } = require('sequelize');
const Reserva = require('../models/Reserva');

describe('Modelo Reserva', () => {
  let sequelize;

  beforeAll(async () => {
    // Configuración para pruebas
    sequelize = new Sequelize('sqlite::memory:', {
      logging: false,
      define: { timestamps: true }
    });
    
    // Inicializa el modelo con la conexión de prueba
    Reserva.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      usuario_id: { type: DataTypes.INTEGER, allowNull: false },
      habitacion_id: { type: DataTypes.INTEGER, allowNull: false },
      fecha: { type: DataTypes.DATEONLY, allowNull: false },
      hora: { type: DataTypes.TIME, allowNull: false }
    }, { sequelize, modelName: 'reserva' });

    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Cierra la conexión explícitamente
    await sequelize.close();
    // Forza el cierre de cualquier conexión pendiente
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  test('Crear reserva válida', async () => {
    const reserva = await Reserva.create({
      usuario_id: 1,
      habitacion_id: 101,
      fecha: '2023-12-31',
      hora: '14:00:00'
    });
    expect(reserva.id).toBeDefined();
  });

  // ... otros tests ...
});