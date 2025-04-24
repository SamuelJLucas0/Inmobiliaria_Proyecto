-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2025 at 12:10 AM
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
  `DES` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publicaciones`
--

INSERT INTO `publicaciones` (`id_publicacion`, `id_user`, `fecha_subida`, `imagenes`, `PRO`, `ESTADO`, `MUN`, `HAB`, `BAN`, `EST`, `AMU`, `TAM`, `PRE`, `DES`) VALUES
(4, 14, '2025-04-23 18:40:57', '[\"/uploads/EscudoDeLaUAQ.jpg\"]', 'Casa', 'Baja California Sur', '123', 123, 123, 'Sí', 'Sí', 123, 123, '123'),
(5, 14, '2025-04-23 18:43:43', '[\"/uploads/fondo2.jpg\"]', 'Casa', 'Baja California Sur', '123', 123, 123, 'Sí', 'Sí', 123, 123, '123');

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
(8, 'Samuel', 'samueljuarezlucas.90@gmail.com', 'pumas123', 'F'),
(9, 'Samuel', 'samueljuarezlucas.91@gmail.com', '123', 'F'),
(10, 'Martin', 'cytus@gmail.com', 'pepe', 'F'),
(11, 'hola', 'shon.90@gmail.com', 'pepe', 'F'),
(12, 'Joselito', 'cytus2@gmail.com', '123', 'F'),
(13, 'Manuel Ivan', 'ivan.90@gmail.com', 'tigre123', 'F'),
(14, 'Erick Issac', 'erick.90@gmail.com', 'kcheleando', 'F');

-- --------------------------------------------------------

--
-- Table structure for table `validaru`
--

CREATE TABLE `validaru` (
  `id_user` int(10) NOT NULL,
  `phone` int(10) NOT NULL,
  `mail2` varchar(50) NOT NULL,
  `ine_photo` varchar(255) NOT NULL,
  `curp` varchar(18) NOT NULL,
  `rfc` varchar(13) NOT NULL,
  `photo_user` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
