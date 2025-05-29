-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cafe_internet
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detalles_renta`
--

DROP TABLE IF EXISTS `detalles_renta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_renta` (
  `id_Detalles_renta` int NOT NULL AUTO_INCREMENT,
  `id_Renta` int NOT NULL,
  `id_Dispositivos` int NOT NULL,
  `Tipo` enum('Consola','Control','Juego','Computadora') NOT NULL,
  `Cantidad` int NOT NULL,
  `Horas_rentadas` int NOT NULL,
  `Costo_de_renta` decimal(10,0) NOT NULL,
  `Subtotal` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id_Detalles_renta`),
  KEY `id_Renta` (`id_Renta`),
  KEY `id_Dispositivos` (`id_Dispositivos`),
  CONSTRAINT `detalles_renta_ibfk_1` FOREIGN KEY (`id_Renta`) REFERENCES `renta_dispositivos` (`id_Renta`),
  CONSTRAINT `detalles_renta_ibfk_2` FOREIGN KEY (`id_Dispositivos`) REFERENCES `dispositivos` (`id_Dispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_renta`
--

LOCK TABLES `detalles_renta` WRITE;
/*!40000 ALTER TABLE `detalles_renta` DISABLE KEYS */;
INSERT INTO `detalles_renta` VALUES (1,1,1,'Consola',1,2,40,80),(2,1,2,'Control',2,2,15,60),(3,2,3,'Juego',1,2,20,40),(4,2,4,'Computadora',1,2,50,100),(5,3,5,'Consola',1,3,35,105),(6,3,6,'Control',1,3,20,60),(7,4,7,'Juego',2,2,25,100),(8,4,8,'Computadora',1,2,45,90),(9,5,9,'Consola',1,1,40,40),(10,5,10,'Control',1,1,15,15),(11,6,1,'Juego',2,2,22,88),(12,6,2,'Computadora',1,2,48,96),(13,7,3,'Consola',1,2,38,76),(14,7,4,'Control',2,2,18,72),(15,8,5,'Juego',1,3,20,60),(16,8,6,'Computadora',1,3,50,150),(17,9,7,'Consola',1,2,40,80),(18,9,8,'Control',1,2,15,30),(19,10,9,'Juego',2,2,25,100),(20,10,10,'Computadora',1,2,45,90),(21,11,1,'Consola',1,2,40,80),(22,11,2,'Control',2,2,15,60),(23,12,3,'Juego',1,2,20,40),(24,12,4,'Computadora',1,2,50,100),(25,13,5,'Consola',1,3,35,105),(26,13,6,'Control',1,3,20,60),(27,14,7,'Juego',2,2,25,100),(28,14,8,'Computadora',1,2,45,90),(29,15,9,'Consola',1,1,40,40),(30,15,10,'Control',1,1,15,15),(31,16,1,'Juego',2,2,22,88),(32,16,2,'Computadora',1,2,48,96),(33,17,3,'Consola',1,2,38,76),(34,17,4,'Control',2,2,18,72),(35,18,5,'Juego',1,3,20,60),(36,18,6,'Computadora',1,3,50,150);
/*!40000 ALTER TABLE `detalles_renta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalles_venta`
--

DROP TABLE IF EXISTS `detalles_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_venta` (
  `id_Detalles_venta` int NOT NULL AUTO_INCREMENT,
  `id_Ventas` int NOT NULL,
  `id_Productos` int DEFAULT NULL,
  `id_Snacks` int DEFAULT NULL,
  `Cantidad` int NOT NULL,
  `Nombre_producto` varchar(50) NOT NULL,
  `Precio_unitario` decimal(10,0) NOT NULL,
  `Subtotal` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id_Detalles_venta`),
  KEY `id_Productos` (`id_Productos`),
  KEY `id_Snacks` (`id_Snacks`),
  KEY `id_Ventas` (`id_Ventas`),
  CONSTRAINT `detalles_venta_ibfk_1` FOREIGN KEY (`id_Productos`) REFERENCES `productos_papeleria` (`id_Producto`),
  CONSTRAINT `detalles_venta_ibfk_2` FOREIGN KEY (`id_Snacks`) REFERENCES `productos_snacks` (`id_Snack`),
  CONSTRAINT `detalles_venta_ibfk_3` FOREIGN KEY (`id_Ventas`) REFERENCES `ventas` (`id_Venta`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_venta`
--

LOCK TABLES `detalles_venta` WRITE;
/*!40000 ALTER TABLE `detalles_venta` DISABLE KEYS */;
INSERT INTO `detalles_venta` VALUES (115,1,17,NULL,3,'Lápiz HB',4,11),(116,1,20,NULL,2,'Pluma azul',8,15),(117,1,NULL,1,1,'Coca-Cola 600ml',18,18),(118,2,NULL,5,2,'Galletas Oreo',20,40),(119,2,18,NULL,1,'Cuaderno cuadrícula',25,25),(120,2,NULL,7,4,'Mazapan',5,20),(121,3,19,NULL,5,'Borrador blanco',5,25),(122,3,NULL,6,3,'Papas Ruffles',25,75),(123,3,21,NULL,1,'Resistol pegamento',15,15),(124,4,NULL,10,2,'Cacahuates Japoneses',22,44),(125,4,22,NULL,3,'Hojas blancas',18,54),(126,4,NULL,3,1,'Jugo Jumex Mango',12,12),(127,5,23,NULL,4,'Marcador negro',12,48),(128,5,NULL,4,2,'Sabritas Original',15,30),(129,5,24,NULL,1,'Regla 30 cm',8,8),(130,6,NULL,8,3,'Pulparindo',8,24),(131,6,25,NULL,1,'Tijeras',20,20),(132,6,NULL,9,2,'Chocolate Abuelita',30,60),(133,7,26,NULL,5,'Corrector líquido',10,50),(134,7,NULL,2,4,'Sabritas Original',15,60),(135,7,27,NULL,3,'Carpeta plástico',22,66),(136,8,NULL,12,1,'Agua Ciel 500ml',8,8),(137,8,28,NULL,2,'Grapadora pequeña',30,60),(138,8,NULL,13,5,'Refresco Fanta 355ml',14,70),(139,1,29,NULL,4,'Clips metálicos',6,24),(140,1,NULL,14,3,'Barritas de granola',18,54),(141,1,30,NULL,1,'Calculadora básica',80,80),(142,8,NULL,15,2,'Palomitas de maíz',20,40),(143,8,31,NULL,3,'Cinta adhesiva',9,27),(144,7,NULL,16,4,'Chicles Trident',10,40),(145,1,32,NULL,2,'Papel bond color',25,50),(146,1,NULL,17,1,'Yogur Danone 125ml',14,14),(147,2,19,NULL,3,'Borrador blanco',5,15),(148,2,NULL,18,2,'Bebida energética',30,60),(149,3,21,NULL,2,'Resistol pegamento',15,30),(150,3,NULL,19,3,'Dulce de leche',15,45),(151,4,23,NULL,1,'Marcador negro',12,12),(152,4,NULL,20,2,'Salsa Valentina',25,50);
/*!40000 ALTER TABLE `detalles_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispositivos`
--

DROP TABLE IF EXISTS `dispositivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispositivos` (
  `id_Dispositivo` int NOT NULL AUTO_INCREMENT,
  `Nombre_dispositivo` varchar(80) DEFAULT NULL,
  `Tipo_dispositivo` enum('Consola','Control','Juego','Computadora') NOT NULL,
  `Estado_unidad` enum('En renta','Disponible','Dañado','En Mantenimiento') NOT NULL,
  `Numero_serie` varchar(10) NOT NULL,
  PRIMARY KEY (`id_Dispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivos`
--

LOCK TABLES `dispositivos` WRITE;
/*!40000 ALTER TABLE `dispositivos` DISABLE KEYS */;
INSERT INTO `dispositivos` VALUES (1,'PlayStation 5','Consola','Disponible','PS50001234'),(2,'PlayStation 4','Consola','En renta','PS40004567'),(3,'Xbox Series X','Consola','Disponible','XBX6001123'),(4,'Xbox One','Consola','Dañado','XBX1000654'),(5,'Xbox 360','Consola','En Mantenimiento','XBX3607890'),(6,'Nintendo Switch','Consola','Disponible','NSW4003210'),(7,'Control PS5 DualSense','Control','Disponible','CTRLPS501'),(8,'Control PS4 DualShock','Control','En renta','CTRLPS402'),(9,'Control Xbox Series X','Control','Dañado','CTRLXBX03'),(10,'Control Xbox One','Control','Disponible','CTRLXBX04'),(11,'Control Xbox 360','Control','En Mantenimiento','CTRLXBX05'),(12,'Joy-Con Nintendo Switch','Control','Disponible','JCNNSW06'),(13,'FIFA 25 PS5','Juego','Disponible','FIFA250001'),(14,'The Last of Us Part III PS5','Juego','En renta','TLOU30021'),(15,'God of War: Valhalla PS5','Juego','Disponible','GOWV25222'),(16,'Spider-Man 2 PS5','Juego','Disponible','SPM200099'),(17,'Uncharted: Legacy Collection PS5','Juego','En Mantenimiento','UNCHRT015'),(18,'Halo Infinite: Reborn Xbox','Juego','Dañado','HALO00888'),(19,'Forza Horizon 6 Xbox','Juego','Disponible','FORZA6111'),(20,'Gears 6 Xbox','Juego','En renta','GEARS6999'),(21,'Starfield: Extended Xbox','Juego','Disponible','STFLD0011'),(22,'Mario Kart X Switch','Juego','Disponible','MKARTSW10'),(23,'The Legend of Zelda: Echoes of Time Switch','Juego','En Mantenimiento','ZELDAET09'),(24,'Super Smash Bros. Ultimate DX Switch','Juego','Disponible','SSBUDX003'),(25,'Animal Crossing: New Frontiers Switch','Juego','Dañado','ACNF0022'),(26,'Call of Duty: Black Ops V Xbox','Juego','Disponible','CODBO5004'),(27,'Gran Turismo 8 PS5','Juego','En renta','GT8054321'),(28,'Computadora','Computadora','Disponible','PC00001111');
/*!40000 ALTER TABLE `dispositivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id_Empleado` int NOT NULL AUTO_INCREMENT,
  `RFC` varchar(13) DEFAULT NULL,
  `Fecha_de_contratacion` date DEFAULT NULL,
  `Puesto` varchar(30) DEFAULT NULL,
  `Sueldo` double DEFAULT NULL,
  `Turno` varchar(15) DEFAULT NULL,
  `Estatus` varchar(10) DEFAULT NULL,
  `Correo` varchar(50) DEFAULT NULL,
  `Telefono` varchar(10) DEFAULT NULL,
  `Nombre` varchar(20) DEFAULT NULL,
  `Ap_paterno` varchar(20) DEFAULT NULL,
  `Ap_materno` varchar(20) DEFAULT NULL,
  `Sexo` char(1) DEFAULT NULL,
  PRIMARY KEY (`id_Empleado`),
  CONSTRAINT `empleados_chk_1` CHECK ((`Estatus` in (_utf8mb4'activo',_utf8mb4'inactivo'))),
  CONSTRAINT `empleados_chk_2` CHECK (regexp_like(`Telefono`,_utf8mb4'^[0-9]+$')),
  CONSTRAINT `empleados_chk_3` CHECK ((`Sexo` in (_utf8mb4'h',_utf8mb4'm')))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (1,'ABC1234567890','2020-03-15','Cajero',4500,'matutino','activo','juan.perez@papeleria.com','5512345678','Juan','Pérez','Gómez','h'),(2,'DEF9876543210','2021-05-22','Atención a clientes',4800,'vespertino','activo','maria.lopez@papeleria.com','5523456789','María','López','Martínez','m'),(3,'GHI4567890123','2019-11-10','Encargado de inventario',5500,'intermedio','activo','carlos.garcia@papeleria.com','5534567890','Carlos','García','Hernández','h'),(4,'JKL0123456789','2022-02-28','Técnico de consolas',5200,'vespertino','activo','ana.torres@papeleria.com','5545678901','Ana','Torres','Vargas','m'),(5,'MNO7890123456','2023-01-15','Auxiliar general',4200,'fin de semana','activo','luis.mendoza@papeleria.com','5556789012','Luis','Mendoza','Silva','h'),(6,'PQR2345678901','2020-07-30','Gerente',7500,'matutino','activo','sofia.ruiz@papeleria.com','5567890123','Sofía','Ruiz','Castro','m'),(7,'STU9012345678','2022-09-05','Cajero',4500,'vespertino','inactivo','pedro.diaz@papeleria.com','5578901234','Pedro','Díaz','Flores','h'),(8,'VWX3456789012','2021-12-12','Encargado de rentas',5000,'intermedio','activo','laura.hernandez@papeleria.com','5589012345','Laura','Hernández','Ortega','m'),(9,'YZA6789012345','2023-04-01','Atención a clientes',4800,'fin de semana','activo','jorge.morales@papeleria.com','5590123456','Jorge','Morales','Ramírez','h'),(10,'BCD0123456789','2018-08-20','Limpieza y mantenimiento',4000,'matutino','activo','isabel.castro@papeleria.com','5501234567','Isabel','Castro','González','m');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `id_Inventario` int NOT NULL AUTO_INCREMENT,
  `id_Dispositivo` int DEFAULT NULL,
  `id_Productos_papeleria` int DEFAULT NULL,
  `id_Productos_snacks` int DEFAULT NULL,
  `Nombre_producto` varchar(50) NOT NULL,
  `Stock` int NOT NULL,
  `Fecha` datetime NOT NULL,
  PRIMARY KEY (`id_Inventario`),
  KEY `id_Dispositivo` (`id_Dispositivo`),
  KEY `id_Productos_papeleria` (`id_Productos_papeleria`),
  KEY `id_Productos_snacks` (`id_Productos_snacks`),
  CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_Dispositivo`) REFERENCES `dispositivos` (`id_Dispositivo`),
  CONSTRAINT `inventario_ibfk_2` FOREIGN KEY (`id_Productos_papeleria`) REFERENCES `productos_papeleria` (`id_Producto`),
  CONSTRAINT `inventario_ibfk_3` FOREIGN KEY (`id_Productos_snacks`) REFERENCES `productos_snacks` (`id_Snack`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (1,1,NULL,NULL,'PlayStation 5',3,'2025-01-15 08:30:00'),(2,2,NULL,NULL,'PlayStation 4',4,'2025-01-15 08:30:00'),(3,3,NULL,NULL,'Xbox Series X',2,'2025-01-15 08:30:00'),(4,4,NULL,NULL,'Xbox One',3,'2025-01-15 08:30:00'),(5,5,NULL,NULL,'Xbox 360',2,'2025-01-15 08:30:00'),(6,6,NULL,NULL,'Nintendo Switch',4,'2025-01-15 08:30:00'),(7,7,NULL,NULL,'Control PS5 DualSense',6,'2025-01-15 08:30:00'),(8,8,NULL,NULL,'Control PS4 DualShock',8,'2025-01-15 08:30:00'),(9,9,NULL,NULL,'Control Xbox Series X',5,'2025-01-15 08:30:00'),(10,10,NULL,NULL,'Control Xbox One',6,'2025-01-15 08:30:00'),(11,11,NULL,NULL,'Control Xbox 360',4,'2025-01-15 08:30:00'),(12,12,NULL,NULL,'Joy-Con Nintendo Switch',7,'2025-01-15 08:30:00'),(13,13,NULL,NULL,'FIFA 25 PS5',3,'2025-01-15 08:30:00'),(14,14,NULL,NULL,'The Last of Us Part III PS5',4,'2025-01-15 08:30:00'),(15,15,NULL,NULL,'God of War: Valhalla PS5',2,'2025-01-15 08:30:00'),(16,16,NULL,NULL,'Spider-Man 2 PS5',3,'2025-01-15 08:30:00'),(17,17,NULL,NULL,'Uncharted: Legacy Collection PS5',3,'2025-01-15 08:30:00'),(18,18,NULL,NULL,'Halo Infinite: Reborn Xbox',3,'2025-01-15 08:30:00'),(19,19,NULL,NULL,'Forza Horizon 6 Xbox',2,'2025-01-15 08:30:00'),(20,20,NULL,NULL,'Gears 6 Xbox',3,'2025-01-15 08:30:00'),(21,21,NULL,NULL,'Starfield: Extended Xbox',2,'2025-01-15 08:30:00'),(22,22,NULL,NULL,'Mario Kart X Switch',3,'2025-01-15 08:30:00'),(23,23,NULL,NULL,'The Legend of Zelda: Echoes of Time Switch',4,'2025-01-15 08:30:00'),(24,24,NULL,NULL,'Super Smash Bros. Ultimate DX Switch',3,'2025-01-15 08:30:00'),(25,25,NULL,NULL,'Animal Crossing: New Frontiers Switch',2,'2025-01-15 08:30:00'),(26,26,NULL,NULL,'Call of Duty: Black Ops V Xbox',3,'2025-01-15 08:30:00'),(27,27,NULL,NULL,'Gran Turismo 8 PS5',2,'2025-01-15 08:30:00'),(28,28,NULL,NULL,'Computadora',8,'2025-01-15 08:30:00'),(29,NULL,17,NULL,'Lápiz HB',50,'2025-01-15 08:30:00'),(30,NULL,18,NULL,'Cuaderno cuadrícula',30,'2025-01-15 08:30:00'),(31,NULL,19,NULL,'Borrador blanco',40,'2025-01-15 08:30:00'),(32,NULL,20,NULL,'Pluma azul',45,'2025-01-15 08:30:00'),(33,NULL,21,NULL,'Resistol pegamento',15,'2025-01-15 08:30:00'),(34,NULL,22,NULL,'Hojas blancas',20,'2025-01-15 08:30:00'),(35,NULL,NULL,1,'Coca-Cola 600ml',48,'2025-01-15 08:30:00'),(36,NULL,NULL,2,'Sabritas Original',36,'2025-01-15 08:30:00'),(37,NULL,NULL,3,'Jugo Jumex Mango',24,'2025-01-15 08:30:00'),(38,NULL,NULL,4,'Agua Bonafont 1L',60,'2025-01-15 08:30:00'),(39,NULL,NULL,5,'Galletas Oreo',28,'2025-01-15 08:30:00'),(40,NULL,NULL,6,'Papas Ruffles',32,'2025-01-15 08:30:00'),(41,NULL,NULL,7,'Mazapan',40,'2025-01-15 08:30:00'),(42,NULL,NULL,8,'Pulparindo',50,'2025-01-15 08:30:00'),(43,NULL,NULL,9,'Chocolate Abuelita',30,'2025-01-15 08:30:00'),(44,NULL,NULL,10,'Cacahuates Japoneses',25,'2025-01-15 08:30:00');
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_papeleria`
--

DROP TABLE IF EXISTS `productos_papeleria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_papeleria` (
  `id_Producto` int NOT NULL AUTO_INCREMENT,
  `Nombre_producto` varchar(80) DEFAULT NULL,
  `Descripcion` varchar(80) DEFAULT NULL,
  `Precio_unitario` double NOT NULL,
  `Marca` varchar(15) NOT NULL,
  PRIMARY KEY (`id_Producto`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_papeleria`
--

LOCK TABLES `productos_papeleria` WRITE;
/*!40000 ALTER TABLE `productos_papeleria` DISABLE KEYS */;
INSERT INTO `productos_papeleria` VALUES (17,'Lápiz HB','Lápiz grafito HB',3.5,'Staedtler'),(18,'Cuaderno cuadrícula','Cuaderno 100 hojas',25,'Moleskine'),(19,'Borrador blanco','Borrador suave',5,'Faber-Castell'),(20,'Pluma azul','Pluma tinta azul',7.5,'Bic'),(21,'Resistol pegamento','Pegamento blanco',15,'Elmer\'s'),(22,'Hojas blancas','Paquete 100 hojas',18,'Navigator'),(23,'Marcador negro','Marcador permanente',12,'Sharpie'),(24,'Regla 30 cm','Regla plástica',8,'Maped'),(25,'Tijeras','Tijeras escolares',20,'Fiskars'),(26,'Corrector líquido','Corrector blanco',10,'Pentel'),(27,'Carpeta plástico','Carpeta tamaño carta',22,'Pendaflex'),(28,'Grapadora pequeña','Grapadora metálica',30,'Swingline'),(29,'Clips metálicos','Paquete 100 clips',6,'ACCO'),(30,'Calculadora básica','Calculadora 8 dígitos',80,'Casio'),(31,'Cinta adhesiva','Cinta transparente',9,'Scotch'),(32,'Papel bond color','Paquete 100 hojas',25,'Hammermill');
/*!40000 ALTER TABLE `productos_papeleria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_snacks`
--

DROP TABLE IF EXISTS `productos_snacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_snacks` (
  `id_Snack` int NOT NULL AUTO_INCREMENT,
  `Nombre_producto` varchar(80) DEFAULT NULL,
  `Descripcion` varchar(80) DEFAULT NULL,
  `Precio_unitario` double NOT NULL,
  `Marca` varchar(15) NOT NULL,
  PRIMARY KEY (`id_Snack`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_snacks`
--

LOCK TABLES `productos_snacks` WRITE;
/*!40000 ALTER TABLE `productos_snacks` DISABLE KEYS */;
INSERT INTO `productos_snacks` VALUES (1,'Coca-Cola 600ml','Refresco 600 ml',18,'Coca-Cola'),(2,'Sabritas Original','Botana salada',15,'Sabritas'),(3,'Jugo Jumex Mango','Jugo mango 250 ml',12,'Jumex'),(4,'Agua Bonafont 1L','Agua natural 1 litro',10,'Bonafont'),(5,'Galletas Oreo','Galletas chocolate',20,'Nabisco'),(6,'Papas Ruffles','Papas fritas 170 g',25,'Ruffles'),(7,'Mazapan','Dulce mazapán',5,'Gamesa'),(8,'Pulparindo','Dulce tamarindo',8,'La Costeña'),(9,'Chocolate Abuelita','Chocolate para mesa',30,'Abuelita'),(10,'Cacahuates Japoneses','Cacahuates salados',22,'Tuny'),(11,'Galletas Marías','Galletas dulces',12,'Gamesa'),(12,'Agua Ciel 500ml','Agua purificada 500ml',8,'Ciel'),(13,'Refresco Fanta 355ml','Refresco naranja',14,'Fanta'),(14,'Barritas de granola','Barritas saludables',18,'Nature Valley'),(15,'Palomitas de maíz','Snack maíz inflado',20,'Orville'),(16,'Chicles Trident','Chicle sin azúcar',10,'Trident'),(17,'Yogur Danone 125ml','Yogur bebible',14,'Danone'),(18,'Bebida energética','Bebida 250ml',30,'Red Bull'),(19,'Dulce de leche','Dulce en barra',15,'La Lechera'),(20,'Salsa Valentina','Salsa picante',25,'Valentina');
/*!40000 ALTER TABLE `productos_snacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `renta_dispositivos`
--

DROP TABLE IF EXISTS `renta_dispositivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `renta_dispositivos` (
  `id_Renta` int NOT NULL AUTO_INCREMENT,
  `id_Empleados` int NOT NULL,
  `Fecha_hora_inicio` datetime NOT NULL,
  `Fecha_hora_fin` datetime NOT NULL,
  `Monto_total` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id_Renta`),
  KEY `id_Empleados` (`id_Empleados`),
  CONSTRAINT `renta_dispositivos_ibfk_1` FOREIGN KEY (`id_Empleados`) REFERENCES `empleados` (`id_Empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `renta_dispositivos`
--

LOCK TABLES `renta_dispositivos` WRITE;
/*!40000 ALTER TABLE `renta_dispositivos` DISABLE KEYS */;
INSERT INTO `renta_dispositivos` VALUES (1,1,'2025-05-06 09:00:00','2025-05-06 11:00:00',120),(2,1,'2025-05-08 08:30:00','2025-05-08 10:30:00',95),(3,1,'2025-05-10 10:00:00','2025-05-10 13:00:00',130),(4,2,'2025-05-06 15:00:00','2025-05-06 17:30:00',115),(5,2,'2025-05-09 14:30:00','2025-05-09 16:00:00',90),(6,2,'2025-05-13 16:00:00','2025-05-13 18:00:00',105),(7,5,'2025-05-03 11:00:00','2025-05-03 13:30:00',125),(8,5,'2025-05-04 12:00:00','2025-05-04 14:30:00',140),(9,5,'2025-05-11 15:00:00','2025-05-11 17:00:00',135),(10,6,'2025-05-07 09:00:00','2025-05-07 11:30:00',130),(11,6,'2025-05-12 08:00:00','2025-05-12 10:00:00',95),(12,6,'2025-05-14 10:30:00','2025-05-14 13:00:00',140),(13,7,'2025-05-06 14:00:00','2025-05-06 16:00:00',120),(14,7,'2025-05-10 15:30:00','2025-05-10 17:30:00',110),(15,7,'2025-05-13 16:00:00','2025-05-13 18:00:00',105),(16,8,'2025-05-05 12:00:00','2025-05-05 14:30:00',125),(17,8,'2025-05-08 13:00:00','2025-05-08 15:00:00',110),(18,8,'2025-05-10 11:30:00','2025-05-10 13:30:00',150);
/*!40000 ALTER TABLE `renta_dispositivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id_Venta` int NOT NULL AUTO_INCREMENT,
  `id_Empleado` int NOT NULL,
  `Fecha_venta` datetime NOT NULL,
  `Total_venta` decimal(10,0) NOT NULL,
  `Metodo_de_pago` enum('Efectivo','Tarjeta') NOT NULL,
  PRIMARY KEY (`id_Venta`),
  KEY `id_Empleado` (`id_Empleado`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_Empleado`) REFERENCES `empleados` (`id_Empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,1,'2025-05-01 00:00:00',48,'Efectivo'),(2,2,'2025-05-02 00:00:00',22,'Tarjeta'),(3,1,'2025-05-04 00:00:00',60,'Efectivo'),(4,5,'2025-05-05 00:00:00',32,'Tarjeta'),(5,6,'2025-05-06 00:00:00',18,'Efectivo'),(6,6,'2025-05-08 00:00:00',10,'Efectivo'),(7,6,'2025-05-09 00:00:00',90,'Tarjeta'),(8,1,'2025-05-10 00:00:00',27,'Efectivo');
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-28 23:48:47
