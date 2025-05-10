# 📦 Backend - Sistema de Reservas Hotel

Este backend está construido en **Node.js + Express + PostgreSQL** y maneja la autenticación de usuarios mediante **JWT**.

## ⚙️ Tecnologías
- **Node.js** (Entorno de ejecución)
- **Express** (Framework web)
- **PostgreSQL** (Base de datos)
- **bcryptjs** (Hashing de contraseñas)
- **jsonwebtoken** (Tokens de autenticación)
- **express-validator** (Validación de datos)
- **dotenv** (Manejo de variables de entorno)

## 🧱 Estructura del Proyecto
backend/
├── app.js # Punto de entrada principal
├── .env # Variables de entorno
├── db/
│ └── db.js # Configuración de conexión a PostgreSQL
├── routes/
│ └── auth.js # Rutas de autenticación
├── controllers/
│ └── authController.js # Lógica de autenticación
├── middlewares/
│ └── auth.js # Middleware de autenticación JWT
└── docs/
└── auth_routes.md # Documentación de endpoints


## ⚙️ Variables de Entorno (`.env`)
```env
PORT=3000
DB_URL=postgresql://usuario:password@localhost:5432/reservas_hotel
JWT_SECRET=clave_ultra_secreta
JWT_EXPIRES_IN=1h

🚀 Instalación
Clonar repositorio

Instalar dependencias:

npm install

🏃 Ejecución

node app.js

📡 Endpoints de Autenticación
POST /register

{
  "email": "usuario@example.com",
  "password": "contraseña_segura"
}

POST /login


{
  "email": "usuario@example.com",
  "password": "contraseña_segura"
}

🔒 Requisitos de Seguridad
Todas las contraseñas se almacenan con hash bcrypt

Los tokens JWT tienen expiración de 1 hora

Validación de formato de email con express-validator

📄 Licencia
MIT

✨ Nota: El middleware de autenticación será implementado en el Sprint 3 para proteger rutas sensibles.


Principales mejoras:
1. Formato consistente de headers y secciones
2. Estructura de directorios visualmente clara
3. Variables de entorno en bloque de código
4. Agregada sección de instalación
5. Especificación de endpoints con ejemplos JSON
6. Detalles de seguridad relevantes
7. Licencia incluida
8. Notas importantes destacadas