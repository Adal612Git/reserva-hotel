# HU-XX: Marcar reserva como “atendida”

---

## 📝 Historia de Usuario

**Como** recepcionista del hotel,  
**quiero** poder marcar una reserva como “atendida” una vez que el cliente llega y se registra presencialmente,  
**para** llevar un control del check-in y evitar confusiones o reservas duplicadas en recepción.

---

## 📌 Estatus  
🕒 Opcional / No prioritaria en MVP inicial  
🔜 Recomendada para segunda fase operativa o cuando el sistema esté en producción

---

## 🎯 Priorización  
Media — Útil para control interno, operatividad y trazabilidad diaria en la recepción.

---

## 👤 Actor Principal  
Recepcionista (autenticado con rol autorizado)

---

## 🔗 Relación con otras historias de usuario

- **HU-07**: Ver reservas del día  
- **HU-03**: Crear nueva reserva  
- **HU-14**: Buscar reservas por nombre o habitación  
- (Futura) HU-20: Generar reporte de huéspedes atendidos  
- (Futura) Integración con panel de limpieza / cierre automático de puertas

---

## 🧱 Requisitos Previos / Dependencias Técnicas

- Vista del recepcionista con listado de reservas del día (HU-07)
- Campo `estado` en la tabla de reservas que acepte el valor “atendida”
- Endpoint: `PUT /api/reservas/:id/atender`
- Middleware que valide que el usuario tiene rol de recepcionista
- Validación de que la reserva está activa y programada para hoy

---

## ✅ Criterios de Aceptación

### 🎯 Criterio 1: Acción visible en reservas del día
- [ ] En el panel del recepcionista, cada reserva debe tener un botón “Marcar como atendida”.
- [ ] Solo debe estar habilitado si la reserva es del día y su estado actual es “activa”.

### 🎯 Criterio 2: Cambio de estado persistente
- [ ] Al marcar como atendida:
  - El estado de la reserva debe pasar de “activa” a “atendida”.
  - Se debe registrar la hora exacta de atención (check-in efectivo).
  - El botón debe desaparecer o cambiar a “Atendida ✅”.

### 🎯 Criterio 3: Seguridad y consistencia
- [ ] Solo recepcionistas autorizados deben poder hacer esta acción.
- [ ] No debe ser posible marcar como atendida una reserva cancelada o finalizada.

---

## 🔄 Flujo Básico

1. Recepcionista accede a “Reservas del día” (HU-07).
2. Localiza la reserva de “Juan Pérez” para habitación 302.
3. Cliente llega físicamente y se identifica.
4. El recepcionista hace clic en “Marcar como atendida”.
5. El backend:
   - Verifica que la reserva existe y está activa
   - Cambia el estado a “atendida”
   - Registra la hora de check-in
6. El frontend muestra confirmación visual.

---

## 📉 Flujos Alternativos

### ❌ Reserva ya atendida
- Mostrar mensaje informativo:
  > “Esta reserva ya fue marcada como atendida”

### ❌ Reserva cancelada
- Mostrar advertencia:
  > “No puedes marcar como atendida una reserva cancelada”

### ❌ Usuario no autorizado
- Mostrar error 403 si intenta la acción sin permisos adecuados

---

## 🔒 Validaciones de Seguridad

- Middleware por rol en backend (solo "recepcionista" o "admin")
- Validación de estado actual de la reserva:
  - Solo permite transición “activa” → “atendida”
- Registro de auditoría (opcional): quién marcó, cuándo y desde qué IP (para trazabilidad futura)

---

## 🧪 Escenarios de prueba

### ✔️ Marcado correcto
```gherkin
Dado que hay una reserva activa para hoy
Y el cliente llega físicamente al hotel
Cuando el recepcionista la marca como atendida
Entonces el sistema debe registrar el check-in y cambiar el estado de la reserva
