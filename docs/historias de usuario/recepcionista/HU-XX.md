# HU-XX: Registrar reserva manual para cliente presencial

---

## 📝 Historia de Usuario

**Como** recepcionista del hotel,  
**quiero** poder registrar manualmente una reserva para un cliente que llega sin haber reservado previamente,  
**para** asegurar su estancia en caso de disponibilidad inmediata, sin que tenga que hacerlo por internet.

---

## 📌 Estatus  
🕒 Opcional / Pendiente de implementación futura

---

## 🎯 Priorización  
Media — No es necesaria para operación digital estándar, pero útil para atender casos presenciales o emergencias.

---

## 👤 Actor Principal  
Recepcionista (usuario con sesión activa y rol autorizado)

---

## 🔗 Relación con otras historias de usuario

- **HU-03**: Crear nueva reserva (flujo similar, pero automatizado)
- **HU-06**: Ver habitaciones disponibles
- **HU-07**: Ver reservas del día
- **HU-14**: Buscar reservas por habitación o nombre
- **HU-18**: Registrar manualmente a un nuevo usuario (cliente)

---

## 🧱 Requisitos Previos / Dependencias Técnicas

- Interfaz de búsqueda de habitaciones disponibles por fecha y personas
- Formulario interno exclusivo para el rol de recepcionista
- Endpoint backend para crear reservas desde el rol "recepcionista"
- Campo para registrar datos mínimos del cliente (si no está registrado)
- Middleware que permita creación de reservas por rol autorizado

---

## ✅ Criterios de Aceptación

### 🎯 Criterio 1: Formulario manual disponible solo para recepcionistas
- [ ] El formulario debe permitir:
  - Fecha de entrada y salida
  - Número de personas
  - Selección de habitación disponible
  - Selección de cliente existente o creación rápida de nuevo

### 🎯 Criterio 2: Validación de disponibilidad
- [ ] Solo se puede registrar si la habitación está libre para ese rango de fechas.

### 🎯 Criterio 3: Asociación correcta
- [ ] Si el cliente ya existe, debe asociarse por su ID.
- [ ] Si no existe, puede crearse rápidamente con nombre y correo (registro interno mínimo).

### 🎯 Criterio 4: Confirmación
- [ ] Al finalizar, se debe mostrar un mensaje de éxito:
  > “Reserva manual registrada correctamente”
- [ ] La reserva debe aparecer de inmediato en el panel de reservas del día (HU-07).

---

## 🔄 Flujo Básico

1. Cliente llega al hotel sin reserva.
2. El recepcionista accede a la sección “Registro Manual”.
3. Llena el formulario:
   - Fechas
   - Personas
   - Habitación disponible
   - Cliente (buscar o crear nuevo)
4. El sistema valida disponibilidad.
5. Se guarda la reserva con estado "activa".
6. Se actualiza el panel de reservas del día.

---

## 📉 Flujos Alternativos

### ❌ Sin habitaciones disponibles
- Mostrar mensaje:  
  > “No hay habitaciones disponibles para ese rango de fechas”

### ❌ Cliente ya tiene reserva activa en esas fechas
- Mostrar advertencia:  
  > “Este cliente ya cuenta con una reserva activa en ese rango”

### ❌ Datos mínimos no ingresados
- Validar que al menos se capture nombre, fechas y habitación

---

## 🔒 Validaciones de Seguridad

- Middleware que asegure que solo recepcionistas o administradores pueden usar este formulario
- Validación del cliente (si ya existe)
- Control de concurrencia para evitar doble reservación en la misma habitación

---

## 🧪 Escenarios de prueba

### ✔️ Registro exitoso
```gherkin
Dado que hay una habitación disponible
Y el recepcionista llena correctamente los datos del cliente y fechas
Cuando presiona “Registrar”
Entonces la reserva se guarda, y aparece en el panel del día
