# ✨ Rutas de Autenticación – Backend Node.js

## 📌 Base URL:
http://localhost:3000/api/auth


---

## 🔐 POST /register  
**Descripción:** Registra un nuevo usuario  
**Cuerpo esperado (JSON):**

```json
{
  "email": "ejemplo@email.com",
  "password": "123456"
}
Respuesta exitosa:

{
  "token": "<JWT_TOKEN>"
}
Errores comunes:

Email ya registrado

Formato inválido de email

Contraseña menor a 6 caracteres

🔐 POST /login
Descripción: Inicia sesión con usuario registrado
Cuerpo esperado (JSON):

{
  "email": "ejemplo@email.com",
  "password": "123456"
}

Respuesta exitosa:

{
  "token": "<JWT_TOKEN>"
}

Errores comunes:

Credenciales inválidas

Email no registrado

Contraseña incorrecta

🛡️ GET /api/protected/perfil
Descripción: Ruta protegida que requiere token válido
Header requerido:

Authorization: Bearer <JWT_TOKEN>

Respuesta:

{
  "message": "Ruta protegida",
  "user": {
    "userId": 1,
    "rol": "usuario"
  }
}
