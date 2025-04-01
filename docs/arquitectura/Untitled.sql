CREATE TABLE `usuario` (
  `id` serial PRIMARY KEY,
  `nombre` varchar(100),
  `apellido` varchar(100),
  `email` varchar(150) UNIQUE,
  `password_hash` text,
  `id_rol` int
);

CREATE TABLE `rol` (
  `id` serial PRIMARY KEY,
  `nombre` varchar(50) UNIQUE
);

CREATE TABLE `tipo_habitacion` (
  `id` serial PRIMARY KEY,
  `nombre` varchar(50),
  `descripcion` text,
  `precio_base` numeric(10,2)
);

CREATE TABLE `habitacion` (
  `id` serial PRIMARY KEY,
  `numero` varchar(10) UNIQUE,
  `descripcion` text,
  `id_tipo_habitacion` int
);

CREATE TABLE `estado_reserva` (
  `id` serial PRIMARY KEY,
  `nombre` varchar(50) UNIQUE
);

CREATE TABLE `reserva` (
  `id` serial PRIMARY KEY,
  `id_usuario` int,
  `id_habitacion` int,
  `fecha_inicio` date,
  `fecha_fin` date,
  `id_estado` int,
  `fecha_creacion` timestamp
);

CREATE TABLE `pago` (
  `id` serial PRIMARY KEY,
  `id_reserva` int,
  `monto` numeric(10,2),
  `fecha_pago` timestamp,
  `metodo_pago` varchar(50)
);

ALTER TABLE `usuario` ADD FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`);

ALTER TABLE `habitacion` ADD FOREIGN KEY (`id_tipo_habitacion`) REFERENCES `tipo_habitacion` (`id`);

ALTER TABLE `reserva` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

ALTER TABLE `reserva` ADD FOREIGN KEY (`id_habitacion`) REFERENCES `habitacion` (`id`);

ALTER TABLE `reserva` ADD FOREIGN KEY (`id_estado`) REFERENCES `estado_reserva` (`id`);

ALTER TABLE `pago` ADD FOREIGN KEY (`id_reserva`) REFERENCES `reserva` (`id`);
