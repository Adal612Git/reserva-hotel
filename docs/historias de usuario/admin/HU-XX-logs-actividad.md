# HU-XX: Ver logs de actividad del sistema

---

## 📝 Historia de Usuario

**Como** administrador del sistema,  
**quiero** ver un historial de acciones relevantes realizadas por los usuarios,  
**para** monitorear el uso del sistema, prevenir fraudes y garantizar trazabilidad.

---

## 📌 Estatus  
🕒 Funcionalidad futura (no requerida en MVP, recomendada en entornos reales)

---

## 🎯 Priorización  
Alta en producción — Crítica para la auditoría, detección de errores y seguridad.

---

## 👤 Actor Principal  
Administrador (rol autorizado)

---

## 🔗 Relación con otras historias de usuario

- **HU-10**: Cambiar rol de usuario  
- **HU-05**: Cancelar reserva  
- **HU-09**: Desactivar habitación  
- **HU-18**: Registro manual de personal  
- **HT-13**: Registro de logs con Winston o Morgan  
- (Futura) HU-XX: Ver historial por usuario

---

## 🧱 Requisitos Previos / Dependencias Técnicas

- Middleware de logging en backend (Winston, Morgan, custom logger)
- Base de datos o archivo donde se registran logs estructurados
- Endpoint `GET /api/logs` protegido por middleware de rol
- Interfaz frontend tipo tabla, con filtros por fecha, acción, usuario o módulo

---

## ✅ Criterios de Aceptación

### 🎯 Criterio 1: Acceso restringido
- [ ] Solo usuarios con rol `admin` pueden acceder al módulo de logs.
- [ ] Otros usuarios deben recibir error 403 si intentan acceder.

### 🎯 Criterio 2: Visualización clara y estructurada
- [ ] Cada log debe mostrar:
  - Fecha y hora
  - Usuario que realizó la acción
  - Acción ejecutada (crear, editar, eliminar, login, etc.)
  - Recurso afectado (reserva, habitación, usuario, etc.)
  - IP de origen (opcional)
  - Estado: éxito o error

### 🎯 Criterio 3: Filtro por criterios
- [ ] El administrador puede filtrar por:
  - Rango de fechas
  - Tipo de acción
  - ID o nombre de usuario
  - Recurso afectado

### 🎯 Criterio 4: Orden cronológico
- [ ] Los logs deben ordenarse por fecha descendente (más reciente primero).

---

## 🔄 Flujo Básico

1. Administrador accede al módulo “Logs del sistema”.
2. El sistema hace una petición a `/api/logs?desde=...&usuario=...`
3. El backend consulta los registros desde base o archivo.
4. Los logs se muestran en una tabla ordenada, con filtros y paginación.
5. El administrador puede inspeccionar detalles y rastrear eventos críticos.

---

## 📉 Flujos Alternativos

### ❌ No hay logs registrados
- Mostrar mensaje:  
  > “No hay registros de actividad para el filtro aplicado”

### ❌ Usuario no autorizado
- Mostrar error 403 o redirigir al login

### ❌ Error de carga
- Mostrar mensaje:  
  > “No se pudo cargar el historial. Intenta nuevamente más tarde.”

---

## 🔒 Validaciones de Seguridad

- Middleware por rol `admin`
- Sanitización de filtros de búsqueda
- Prevención de acceso a logs sensibles de autenticación (como hashes o tokens)

---

## 🧪 Escenarios de prueba

### ✔️ Visualización básica
```gherkin
Dado que existen logs de acciones realizadas esta semana
Cuando el administrador accede al panel de logs
Entonces debe ver la lista con fecha, acción, usuario y estado
