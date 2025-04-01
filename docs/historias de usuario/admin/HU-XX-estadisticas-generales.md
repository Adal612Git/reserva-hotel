# HU-XX: Ver estadísticas generales (ocupación, ingresos, etc.)

---

## 📝 Historia de Usuario

**Como** administrador del sistema,  
**quiero** ver estadísticas generales como tasas de ocupación, ingresos por fecha, habitaciones más utilizadas,  
**para** analizar el rendimiento del hotel y tomar decisiones estratégicas.

---

## 📌 Estatus  
🕒 Opcional futura — Funcionalidad de fase 2 o superior (post MVP)

---

## 🎯 Priorización  
Media-Alta en etapa de crecimiento. Aporta gran valor, pero requiere datos acumulados y estructuras analíticas.

---

## 👤 Actor Principal  
Administrador (usuario con permisos elevados)

---

## 🔗 Relación con otras historias de usuario

- **HU-03**: Crear nueva reserva (fuente de datos de ingresos)
- **HU-05**: Cancelar reserva (afecta estadísticas de ocupación)
- **HU-07**: Ver reservas del día (dato base diario)
- **HU-08–HU-09**: Gestión de habitaciones (inventario activo)
- **HU-10**: Roles — solo admin accede a esta vista
- (Futura) HU-XX: Reportes exportables en PDF o Excel

---

## 🧱 Requisitos Previos / Dependencias Técnicas

- Datos suficientes almacenados en BD (reservas, habitaciones, ingresos)
- Endpoint tipo `GET /api/estadisticas/resumen`
- Sistema de roles que limite acceso a administradores
- Módulo de frontend que consuma y grafique estadísticas:
  - Chart.js / ApexCharts / Recharts en Angular
- Agrupamientos por fechas, estados de reserva y tipo de habitación

---

## ✅ Criterios de Aceptación

### 🎯 Criterio 1: Acceso restringido
- [ ] Solo usuarios con rol `admin` pueden ver esta sección.
- [ ] El menú de estadísticas debe estar oculto para otros roles.

### 🎯 Criterio 2: Panel visual y entendible
- [ ] El sistema debe mostrar estadísticas en forma de:
  - Gráficas de líneas (ingresos por fecha)
  - Gráficas de pastel (ocupación por tipo de habitación)
  - Barras (reservas por día o mes)
  - Indicadores clave (KPI cards):
    - Ocupación actual
    - Ingresos del mes
    - Habitaciones más reservadas

### 🎯 Criterio 3: Filtro por fechas
- [ ] El administrador puede seleccionar:
  - Rango personalizado (ej. del 1 al 15 de abril)
  - Presets: Hoy / Esta semana / Este mes / Año actual

### 🎯 Criterio 4: Información exacta y confiable
- [ ] Las métricas deben excluir reservas canceladas.
- [ ] Las reservas atendidas y finalizadas deben contarse como “ocupación efectiva”.

---

## 🔄 Flujo Básico

1. El administrador accede al panel de estadísticas desde su menú.
2. Selecciona un rango de fechas o filtro rápido.
3. El frontend hace una petición a `/api/estadisticas/resumen?desde=2025-04-01&hasta=2025-04-30`.
4. El backend calcula:
   - Total de ingresos (sumando precio por noche × noches × reservas efectivas)
   - Ocupación por día (habitaciones reservadas vs habitaciones activas)
   - Habitaciones más demandadas
5. El frontend renderiza los gráficos e indicadores.
6. El administrador analiza y descarga si se implementa exportación.

---

## 📉 Flujos Alternativos

### ❌ No hay datos suficientes
- Mostrar mensaje:  
  > “Aún no hay suficientes datos para mostrar estadísticas en este rango”

### ❌ Filtro inválido
- Validación de fechas y rangos lógicos

### ❌ Usuario no autorizado
- Error 403 o redirección

---

## 🔒 Validaciones de Seguridad

- Middleware por rol `admin`
- Sanitizar inputs de fechas
- No permitir acceder a datos detallados por cliente desde aquí (evitar fuga de privacidad)

---

## 🧪 Escenarios de prueba

### ✔️ Acceso y visualización correcta
```gherkin
Dado que el administrador accede al módulo de estadísticas
Y selecciona el rango del 1 al 30 de abril
Cuando hay reservas en ese periodo
Entonces debe ver gráficas e indicadores actualizados con los datos correspondientes
