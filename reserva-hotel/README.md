# 🏨 Sistema de Reservas Online

Este proyecto es un sistema completo para gestionar reservas hoteleras, diseñado para ser moderno, seguro y escalable. Permite a los usuarios consultar habitaciones, crear reservas, realizar pagos y administrar su perfil desde una interfaz web intuitiva.

---

## 🧭 Visión General del Proyecto

**Objetivo:** Construir una plataforma robusta y eficiente que simplifique la gestión de reservas para hoteles, brindando una experiencia ágil tanto para los huéspedes como para los administradores del sistema.

**Características principales:**
- ✅ Reservas seguras y rápidas con confirmación inmediata
- 📅 Gestión flexible de habitaciones, usuarios y pagos
- 🏗️ Arquitectura modular con backend en Node.js y alternativa en Spring Boot
- 📱 Interfaz responsive y amigable desarrollada con Angular
- 🔐 Sistema de autenticación y autorización seguro

---

## 🛠️ Stack Tecnológico

| Capa            | Tecnologías Principales       | Alternativas/Opcionales     |
|-----------------|-------------------------------|-----------------------------|
| Frontend        | Angular 16+, TypeScript       | PrimeNG (UI components)     |
| Backend (main)  | Node.js 18+, Express.js       | NestJS                      |
| Backend (alt)   | Spring Boot 3+, Java 17       | -                           |
| Base de Datos   | PostgreSQL 15+                | MongoDB (para documentos)   |
| ORM/DB Access   | Sequelize, Prisma             | pg (raw SQL)                |
| Autenticación   | JWT, OAuth 2.0                | -                           |
| DevOps          | GitHub Actions, Docker        | -                           |

---

## 📂 Estructura del Proyecto

sistema-reservas-online/
├── backend/                       # API REST principal (Node.js + Express)
│   ├── src/
│   │   ├── controllers/           # Lógica de endpoints
│   │   ├── models/                # Modelos de datos
│   │   ├── routes/                # Definición de rutas
│   │   ├── services/              # Lógica de negocio
│   │   └── app.js                 # Configuración principal
│   └── package.json               # Dependencias Node.js
│
├── backend-alt/                   # API REST alternativa (Spring Boot)
│   ├── src/main/java/             # Código fuente Java
│   └── pom.xml                    # Configuración Maven
│
├── frontend/                      # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/        # Componentes UI
│   │   │   ├── services/          # Servicios API
│   │   │   └── models/            # Interfaces TypeScript
│   │   └── assets/                # Estilos e imágenes
│   └── package.json               # Dependencias Angular
│
├── docs/                          # Documentación del proyecto
│   ├── api.md                     # Especificación API
│   └── database.md                # Modelo de datos
│
├── docker-compose.yml             # Configuración para Docker
└── README.md                      # Este archivo


## 🚀 Estado Actual del Proyecto

**✅ Sprint 0 Completado:**
- Diseño del modelo de base de datos
- Configuración inicial del proyecto
- Conexión a PostgreSQL establecida

**🔜 Sprint 1 en Progreso:**
- [ ] Implementación de API REST básica
- [ ] Sistema de autenticación de usuarios
- [ ] CRUD para gestión de habitaciones

---

## 💡 Autor

**Desarrollado por:** Romero Medina Ricardo Adalberto  
**Institución:** Tecnológico Superior de Jalisco  
**Contacto:** [romeromedinar612@gmail.com](romeromedinar612@gmail.com)  
**Repositorio:** [https://github.com/Adal612Git/reserva-hotel](https://github.com/Adal612Git/reserva-hotel)