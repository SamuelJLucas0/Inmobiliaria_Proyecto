-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 06:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inmobiliaria`
--

-- --------------------------------------------------------

--
-- Table structure for table `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id_publicacion` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `fecha_subida` timestamp NOT NULL DEFAULT current_timestamp(),
  `imagenes` longtext DEFAULT NULL,
  `PRO` varchar(20) NOT NULL,
  `ESTADO` varchar(50) NOT NULL,
  `MUN` varchar(50) NOT NULL,
  `HAB` int(10) NOT NULL,
  `BAN` int(10) NOT NULL,
  `EST` varchar(5) NOT NULL,
  `AMU` varchar(5) NOT NULL,
  `TAM` int(10) NOT NULL,
  `PRE` int(20) NOT NULL,
  `DES` varchar(250) NOT NULL,
  `Extras` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`Extras`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publicaciones`
--

INSERT INTO `publicaciones` (`id_publicacion`, `id_user`, `fecha_subida`, `imagenes`, `PRO`, `ESTADO`, `MUN`, `HAB`, `BAN`, `EST`, `AMU`, `TAM`, `PRE`, `DES`, `Extras`) VALUES
(13, 8, '2025-04-28 03:10:46', '[\"/uploads/25728937560_1f81b89fb8_o.jpg\",\"/uploads/casa.jpg\",\"/uploads/fondo2.jpg\"]', 'Casa', 'Morelos', 'Cuernavaca', 5, 4, 'Sí', 'Sí', 600, 2500000, 'Vive el confort en esta espectacular casa de 3 habitaciones, 2 baños completos y un amplio jardín privado. Con acabados de lujo, cocina equipada de concepto abierto y cochera para 2 autos, esta propiedad es ideal para familias que buscan comodidad y ', '[\"Alberca\",\"Jacuzzi\",\"Terraza\",\"Área de juegos infantiles\",\"Aire acondicionado\",\"Seguridad privada\",\"Sistema de riego\"]'),
(14, 15, '2025-04-28 03:12:08', '[\"/uploads/fondo3.jpg\",\"/uploads/fondo4.jpg\",\"/uploads/fondo5.jpg\"]', 'Departamento', 'Querétaro', 'Av. De La Luz', 2, 1, 'No', 'Sí', 250, 4500000, '¿Sueñas con despertar rodeado de naturaleza? Esta hermosa casa de campo ofrece 4 recámaras, terraza con vista panorámica, y un terreno de más de 800 m² para disfrutar del aire libre. Perfecta para quienes buscan paz y privacidad, a tan solo 15 minuto', '[\"Jacuzzi\",\"Roof Garden\",\"Cuarto de TV\",\"Salón de usos múltiples\",\"Gimnasio\"]'),
(15, 14, '2025-04-28 03:15:43', '[\"/uploads/1-terreno.jpg\",\"/uploads/images.jpg\"]', 'Terreno', 'Estado de México', 'toluca', 8, 2, 'Sí', 'No', 600, 2500000, 'Oportunidad única: terreno de 600 m² en zona de alta plusvalía, perfecto para construir la casa de tus sueños o invertir en un desarrollo. Totalmente plano, con servicios de agua, luz y drenaje a pie de calle. A sólo 10 minutos del centro y con fácil', '[\"Seguridad privada\",\"Mercados cercanos\",\"Restaurantes cercanos\"]'),
(16, 15, '2025-04-28 03:18:32', '[\"/uploads/2.jpg\",\"/uploads/3.jpg\",\"/uploads/home.png\"]', 'Casa', 'Baja California Sur', 'La paz', 3, 3, 'Sí', 'No', 450, 3000000, 'Ubicada en el corazón de la ciudad, esta casa de 2 pisos cuenta con 5 habitaciones, ideal para uso residencial o comercial. Remodelada recientemente, combina el encanto tradicional con modernizaciones inteligentes. Cerca de tiendas, escuelas y transp', '[\"Jacuzzi\",\"Mercados cercanos\"]');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(25) NOT NULL,
  `user_validation` varchar(2) NOT NULL DEFAULT 'F'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `name`, `mail`, `password`, `user_validation`) VALUES
(8, 'Samuel', 'samueljuarezlucas.90@gmail.com', 'pumas123', 'T'),
(9, 'Samuel', 'samueljuarezlucas.91@gmail.com', '123', 'F'),
(10, 'Martin', 'cytus@gmail.com', 'pepe', 'F'),
(11, 'hola', 'shon.90@gmail.com', 'pepe', 'F'),
(12, 'Joselito', 'cytus2@gmail.com', '123', 'F'),
(13, 'Manuel Ivan', 'ivan.90@gmail.com', 'tigre123', 'F'),
(14, 'Erick Issac', 'erick.90@gmail.com', 'kcheleando', 'T'),
(15, 'Jean Emmanuel', 'jean.90@gmail.com', 'jean123', 'T');

-- --------------------------------------------------------

--
-- Table structure for table `validaru`
--

CREATE TABLE `validaru` (
  `id_user` int(10) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `mail2` varchar(50) NOT NULL,
  `ine_photo` varchar(255) NOT NULL,
  `curp` varchar(18) NOT NULL,
  `rfc` varchar(13) NOT NULL,
  `photo_user` varchar(255) NOT NULL,
  `status` varchar(20) DEFAULT 'En revisión'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `validaru`
--

INSERT INTO `validaru` (`id_user`, `phone`, `mail2`, `ine_photo`, `curp`, `rfc`, `photo_user`, `status`) VALUES
(15, '7771377483', 'jean.90@gmail.com', '/uploads/ine2.webp', 'JAB050921HMSRCMA9B', 'JAB050921HMSR', '/uploads/p2.jpg', 'Validado'),
(14, '2211996527', 'erick.90@gmail.com', '/uploads/ine3.jpg', 'EI050921HMSRCMA9AB', 'EI050921HMSRC', '/uploads/p3.webp', 'Validado'),
(8, '7776438044', 'samueljuarezlucas.90@gmail.com', '/uploads/ine_juana.jpg', 'JULS050921HMSRCMA9', 'JUGR670216T8A', '/uploads/juana.jpg', 'Validado');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
