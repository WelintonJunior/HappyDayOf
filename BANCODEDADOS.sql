CREATE DATABASE  IF NOT EXISTS `happyday2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `happyday2`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: happyday2
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `tblacademia`
--

DROP TABLE IF EXISTS `tblacademia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblacademia` (
  `acaId` int NOT NULL AUTO_INCREMENT,
  `acaCnpj` varchar(18) DEFAULT NULL,
  `acaNome` varchar(50) NOT NULL,
  `acaDataCadastro` date DEFAULT NULL,
  `acaStatus` char(1) DEFAULT NULL,
  `acaCelular` varchar(15) NOT NULL,
  `acaCep` varchar(11) DEFAULT NULL,
  `acaCor` varchar(7) DEFAULT NULL,
  `acaTelefone` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`acaId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblacademia`
--

LOCK TABLES `tblacademia` WRITE;
/*!40000 ALTER TABLE `tblacademia` DISABLE KEYS */;
INSERT INTO `tblacademia` VALUES (1,'02.765.381/0001-25','Happy Day','2024-04-11','1','(18) 20931-2809','12570114','#ff0000','1829-3012'),(2,'51.526.104/0001-75','Skull Gym','2024-04-12','1','(12) 90381-2930','12520110','#2e2e2e','1283-9018');
/*!40000 ALTER TABLE `tblacademia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblatendimento`
--

DROP TABLE IF EXISTS `tblatendimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblatendimento` (
  `ateId` int NOT NULL AUTO_INCREMENT,
  `ateIdCliente` int DEFAULT NULL,
  `ateIdFuncionario` int DEFAULT NULL,
  `ateDateInicio` datetime DEFAULT NULL,
  `ateIdAcad` int NOT NULL,
  `ateStatus` char(1) DEFAULT NULL,
  `ateDateEncerramento` datetime DEFAULT NULL,
  PRIMARY KEY (`ateId`),
  KEY `ateIdFuncionario` (`ateIdFuncionario`),
  KEY `ateIdAcad` (`ateIdAcad`),
  KEY `ateIdCliente` (`ateIdCliente`),
  CONSTRAINT `tblatendimento_ibfk_1` FOREIGN KEY (`ateIdFuncionario`) REFERENCES `tblfuncionario` (`funId`),
  CONSTRAINT `tblatendimento_ibfk_2` FOREIGN KEY (`ateIdAcad`) REFERENCES `tblacademia` (`acaId`),
  CONSTRAINT `tblatendimento_ibfk_3` FOREIGN KEY (`ateIdCliente`) REFERENCES `tblcliente` (`cliId`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblatendimento`
--

LOCK TABLES `tblatendimento` WRITE;
/*!40000 ALTER TABLE `tblatendimento` DISABLE KEYS */;
INSERT INTO `tblatendimento` VALUES (1,1,6,'2024-04-11 09:03:26',1,'0','2024-04-11 09:03:30'),(2,1,5,'2024-04-12 09:52:51',1,'0','2024-04-12 09:52:53'),(3,2,5,'2024-04-12 10:02:30',1,'0','2024-04-12 10:02:32'),(4,1,5,'2024-04-12 11:14:50',1,'0','2024-04-12 11:18:17'),(5,1,5,'2024-04-12 11:22:40',1,'0','2024-04-12 12:21:37'),(6,3,5,'2024-04-12 12:21:33',1,'0','2024-04-12 12:21:39'),(7,3,5,'2024-04-12 12:21:41',1,'0','2024-04-12 12:22:18'),(8,1,5,'2024-04-12 12:22:12',1,'0','2024-04-12 12:22:16'),(9,1,5,'2024-04-12 12:22:20',1,'0','2024-04-12 12:22:22'),(10,1,5,'2024-04-12 12:23:56',1,'0','2024-04-12 12:24:07'),(11,2,5,'2024-04-12 12:24:04',1,'0','2024-04-12 12:24:08'),(12,1,5,'2024-04-12 12:28:46',1,'0','2024-04-12 12:32:18'),(13,2,5,'2024-04-12 12:29:46',1,'0','2024-04-12 12:32:17'),(14,1,5,'2024-04-12 12:32:20',1,'0','2024-04-12 12:33:40'),(15,1,5,'2024-04-12 12:33:42',1,'0','2024-04-12 12:34:46'),(16,1,5,'2024-04-12 12:34:48',1,'0','2024-04-12 12:37:54'),(17,1,5,'2024-04-12 12:37:56',1,'0','2024-04-12 12:38:55'),(18,1,5,'2024-04-12 12:39:01',1,'0','2024-04-12 12:39:23'),(19,1,5,'2024-04-12 12:39:28',1,'0','2024-04-12 12:40:10'),(20,1,5,'2024-04-12 12:40:12',1,'0','2024-04-12 12:40:17'),(21,1,5,'2024-04-12 12:40:22',1,'0','2024-04-12 12:40:49'),(22,1,5,'2024-04-12 12:40:55',1,'0','2024-04-12 12:41:34'),(23,1,5,'2024-04-12 12:41:40',1,'0','2024-04-12 12:42:16'),(24,1,5,'2024-04-12 12:42:35',1,'0','2024-04-12 12:44:00'),(25,1,5,'2024-04-12 12:45:28',1,'0','2024-04-12 12:45:31'),(26,1,5,'2024-04-12 12:45:34',1,'0','2024-04-12 12:47:35'),(27,2,5,'2024-04-12 12:47:22',1,'0','2024-04-12 12:47:41'),(28,2,5,'2024-04-12 12:47:45',1,'0','2024-04-12 12:49:26'),(29,1,5,'2024-04-12 12:47:59',1,'0','2024-04-12 12:48:08'),(30,1,5,'2024-04-12 12:48:14',1,'0','2024-04-12 12:49:24'),(31,1,5,'2024-04-12 12:49:29',1,'0','2024-04-12 12:51:05'),(32,1,5,'2024-04-12 12:51:07',1,'0','2024-04-12 12:51:33'),(33,1,5,'2024-04-12 12:52:16',1,'0','2024-04-12 12:52:20'),(34,1,5,'2024-04-12 12:54:33',1,'0','2024-04-12 12:54:40'),(35,2,5,'2024-04-12 12:54:38',1,'0','2024-04-12 12:54:42'),(36,1,5,'2024-04-12 12:59:38',1,'0','2024-04-12 12:59:56'),(37,1,5,'2024-04-12 13:00:36',1,'0','2024-04-12 13:00:40'),(38,1,5,'2024-04-12 13:03:04',1,'0','2024-04-12 13:03:06'),(39,1,5,'2024-04-12 13:03:12',1,'0','2024-04-12 19:57:36'),(40,1,5,'2024-04-12 19:57:40',1,'0','2024-04-12 19:58:05'),(41,1,5,'2024-04-12 20:01:02',1,'0','2024-04-12 20:01:05'),(42,1,5,'2024-04-14 09:14:24',1,'0','2024-04-14 09:14:31'),(43,1,5,'2024-04-14 09:14:33',1,'0','2024-04-14 09:14:37'),(44,1,5,'2024-04-14 09:32:06',1,'0','2024-04-14 09:32:09'),(45,1,5,'2024-04-14 09:34:27',1,'0','2024-04-14 09:34:29'),(46,1,5,'2024-04-14 09:34:43',1,'0','2024-04-14 09:34:48'),(47,1,5,'2024-04-14 09:37:18',1,'0','2024-04-14 09:37:20'),(48,1,5,'2024-04-14 09:47:40',1,'0','2024-04-14 09:47:41'),(49,1,5,'2024-04-14 09:48:53',1,'0','2024-04-14 09:48:54'),(50,1,5,'2024-04-14 09:51:52',1,'0','2024-04-14 09:51:52'),(51,1,5,'2024-04-14 09:53:17',1,'0','2024-04-14 09:53:20'),(52,1,5,'2024-04-14 09:56:51',1,'0','2024-04-14 09:56:53'),(53,1,5,'2024-04-14 10:13:28',1,'0','2024-04-14 10:13:30'),(54,1,5,'2024-04-14 10:19:41',1,'0','2024-04-14 10:19:43'),(55,1,5,'2024-04-14 10:21:17',1,'0','2024-04-14 10:21:18'),(56,1,5,'2024-04-14 10:25:39',1,'0','2024-04-14 10:25:43'),(57,1,5,'2024-04-14 10:27:40',1,'0','2024-04-14 10:27:42'),(58,1,5,'2024-04-14 10:30:07',1,'0','2024-04-14 10:30:10'),(59,1,5,'2024-04-14 11:09:35',1,'0','2024-04-14 11:09:37'),(60,1,5,'2024-04-14 11:12:29',1,'0','2024-04-14 11:12:30'),(61,1,5,'2024-04-14 11:13:09',1,'0','2024-04-14 11:13:11'),(62,1,5,'2024-04-14 11:14:54',1,'0','2024-04-14 11:14:55'),(63,1,5,'2024-04-14 11:16:22',1,'0','2024-04-14 11:16:22'),(64,1,5,'2024-04-14 11:17:02',1,'0','2024-04-14 11:17:02'),(65,1,5,'2024-04-14 11:17:25',1,'0','2024-04-14 11:17:25'),(66,1,5,'2024-04-14 11:17:48',1,'0','2024-04-14 11:17:49'),(67,1,5,'2024-04-14 11:19:33',1,'0','2024-04-14 11:19:34'),(68,1,5,'2024-04-14 11:20:05',1,'0','2024-04-14 11:20:07'),(69,1,5,'2024-04-14 11:20:26',1,'0','2024-04-14 11:20:27'),(70,1,5,'2024-04-14 11:22:11',1,'0','2024-04-14 11:22:12'),(71,1,5,'2024-04-14 11:23:18',1,'0','2024-04-14 11:23:19'),(72,1,5,'2024-04-14 11:23:59',1,'0','2024-04-14 11:24:00'),(73,1,5,'2024-04-14 11:25:49',1,'0','2024-04-14 11:25:50'),(74,1,5,'2024-04-14 11:26:20',1,'0','2024-04-14 11:26:21'),(75,1,5,'2024-04-14 11:26:54',1,'0','2024-04-14 11:26:54'),(76,1,5,'2024-04-14 11:28:12',1,'0','2024-04-14 11:28:12'),(77,1,5,'2024-04-14 11:28:57',1,'0','2024-04-14 11:28:58'),(78,1,5,'2024-04-14 11:29:11',1,'0','2024-04-14 11:29:12'),(79,1,5,'2024-04-14 11:30:08',1,'0','2024-04-14 11:30:10'),(80,1,5,'2024-04-14 11:30:26',1,'0','2024-04-14 11:30:27'),(81,1,5,'2024-04-14 11:30:41',1,'0','2024-04-14 11:30:42'),(82,1,5,'2024-04-14 11:31:05',1,'0','2024-04-14 11:31:05'),(83,1,5,'2024-04-14 11:31:47',1,'0','2024-04-14 11:31:48'),(84,1,5,'2024-04-14 11:32:18',1,'0','2024-04-14 11:32:19'),(85,1,5,'2024-04-14 11:33:37',1,'0','2024-04-14 11:33:38'),(86,1,5,'2024-04-14 11:33:47',1,'0','2024-04-14 11:33:48'),(87,1,5,'2024-04-14 11:33:57',1,'0','2024-04-14 11:34:01'),(88,1,5,'2024-04-14 11:34:13',1,'0','2024-04-14 11:34:14'),(89,1,5,'2024-04-14 11:34:29',1,'0','2024-04-14 11:34:29'),(90,1,5,'2024-04-14 11:34:51',1,'0','2024-04-14 11:34:56'),(91,1,5,'2024-04-14 11:35:04',1,'0','2024-04-14 11:35:05'),(92,1,5,'2024-04-14 11:35:29',1,'0','2024-04-14 11:35:30'),(93,1,5,'2024-04-14 11:35:50',1,'0','2024-04-14 11:35:51'),(94,1,5,'2024-04-14 11:36:53',1,'0','2024-04-14 11:36:54'),(95,1,5,'2024-04-14 11:40:35',1,'0','2024-04-14 11:40:37'),(96,1,5,'2024-04-14 11:41:19',1,'0','2024-04-14 11:41:20'),(97,1,5,'2024-04-14 11:41:27',1,'0','2024-04-14 11:41:28'),(98,1,5,'2024-04-14 11:41:35',1,'0','2024-04-14 11:41:45'),(99,1,5,'2024-04-14 11:42:16',1,'0','2024-04-14 11:42:21'),(100,1,5,'2024-04-14 11:42:34',1,'0','2024-04-14 11:42:35'),(101,1,5,'2024-04-14 11:42:57',1,'0','2024-04-14 11:42:58'),(102,1,5,'2024-04-14 11:48:19',1,'0','2024-04-14 11:48:21');
/*!40000 ALTER TABLE `tblatendimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblcliente`
--

DROP TABLE IF EXISTS `tblcliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblcliente` (
  `cliId` int NOT NULL AUTO_INCREMENT,
  `cliNome` varchar(100) NOT NULL,
  `cliCelular` varchar(15) NOT NULL,
  `cliCep` varchar(10) DEFAULT NULL,
  `cliCidade` varchar(30) DEFAULT NULL,
  `cliEstado` varchar(30) DEFAULT NULL,
  `cliRua` varchar(100) DEFAULT NULL,
  `cliNumeroRua` int DEFAULT NULL,
  `cliSexo` char(1) NOT NULL,
  `cliCpf` varchar(15) NOT NULL,
  `cliEmail` varchar(100) NOT NULL,
  `cliDataCmc` datetime DEFAULT NULL,
  `cliStatus` char(1) DEFAULT NULL,
  `cliPlano` int DEFAULT NULL,
  `cliIdAcad` int DEFAULT NULL,
  `cliSenha` varchar(200) NOT NULL,
  PRIMARY KEY (`cliId`),
  KEY `fk_cliPlano` (`cliPlano`),
  KEY `cliAcad` (`cliIdAcad`),
  CONSTRAINT `fk_cliPlano` FOREIGN KEY (`cliPlano`) REFERENCES `tblplanos` (`plaId`),
  CONSTRAINT `tblcliente_ibfk_1` FOREIGN KEY (`cliIdAcad`) REFERENCES `tblacademia` (`acaId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcliente`
--

LOCK TABLES `tblcliente` WRITE;
/*!40000 ALTER TABLE `tblcliente` DISABLE KEYS */;
INSERT INTO `tblcliente` VALUES (1,'Yasmin','(18) 92738-9127','12570112','Aparecida','SP','Rua Alfredo Penido',20,'F','565.435.430-27','yasmin@gmail.com','1970-01-01 00:00:00','1',1,1,'123123'),(2,'Yasminn','(12) 73813-8912','12570102','Aparecida','SP','Rua Ignácio Bustamante',10,'F','089.498.710-09','yasminn@gmail.com','2024-04-11 00:00:00','1',1,1,'123123'),(3,'Yasminnn','(12) 90381-0293','12570102','Aparecida','SP','Rua Ignácio Bustamante',10,'F','540.068.260-01','yasminnn@gmaill.com','2024-04-11 00:00:00','0',1,1,'123123'),(4,'bbbbb','(12) 31238-9120','12520110','Guaratinguetá','SP','Rua Filadelfo Gandra Martins',10,'M','577.821.068-00','bbb@gmail.com','2024-04-12 00:00:00','0',1,1,'123123'),(5,'weqwew','(12) 31232-1312','12520110','Guaratinguetá','SP','Rua Filadelfo Gandra Martins',10,'M','089.498.710-09','weq@gmail.com','2024-04-14 11:46:28','1',1,1,'123123'),(6,'felipe','(12) 31283-9012','12520110','Guaratinguetá','SP','Rua Filadelfo Gandra Martins',10,'F','089.498.710-09','felipe@gmail.com','2024-04-14 11:47:00','1',1,1,'123123');
/*!40000 ALTER TABLE `tblcliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbldesempenho`
--

DROP TABLE IF EXISTS `tbldesempenho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbldesempenho` (
  `desId` int NOT NULL AUTO_INCREMENT,
  `desIdCliente` int NOT NULL,
  `desData` date DEFAULT NULL,
  `desPeso` double DEFAULT NULL,
  `desGordura` double DEFAULT NULL,
  PRIMARY KEY (`desId`),
  KEY `desIdCliente` (`desIdCliente`),
  CONSTRAINT `tbldesempenho_ibfk_1` FOREIGN KEY (`desIdCliente`) REFERENCES `tblcliente` (`cliId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbldesempenho`
--

LOCK TABLES `tbldesempenho` WRITE;
/*!40000 ALTER TABLE `tbldesempenho` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbldesempenho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblengajamento`
--

DROP TABLE IF EXISTS `tblengajamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblengajamento` (
  `engId` int NOT NULL AUTO_INCREMENT,
  `engIdCliente` int DEFAULT NULL,
  `engAccessDatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`engId`),
  KEY `engIdCliente` (`engIdCliente`),
  CONSTRAINT `tblengajamento_ibfk_1` FOREIGN KEY (`engIdCliente`) REFERENCES `tblcliente` (`cliId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblengajamento`
--

LOCK TABLES `tblengajamento` WRITE;
/*!40000 ALTER TABLE `tblengajamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblengajamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblficha`
--

DROP TABLE IF EXISTS `tblficha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblficha` (
  `ficId` int NOT NULL AUTO_INCREMENT,
  `ficIdCliente` int NOT NULL,
  `ficIdFuncionario` int NOT NULL,
  `ficIdAcademia` int NOT NULL,
  `ficIntervalo` time DEFAULT NULL,
  `ficRestricoes` char(1) DEFAULT NULL,
  `ficTipoRestricoes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ficId`),
  KEY `fk_acaFic` (`ficIdAcademia`),
  KEY `fk_acaCli` (`ficIdCliente`),
  KEY `fk_funfic` (`ficIdFuncionario`),
  CONSTRAINT `fk_acaCli` FOREIGN KEY (`ficIdCliente`) REFERENCES `tblcliente` (`cliId`),
  CONSTRAINT `fk_acaFic` FOREIGN KEY (`ficIdAcademia`) REFERENCES `tblacademia` (`acaId`),
  CONSTRAINT `fk_funfic` FOREIGN KEY (`ficIdFuncionario`) REFERENCES `tblfuncionario` (`funId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblficha`
--

LOCK TABLES `tblficha` WRITE;
/*!40000 ALTER TABLE `tblficha` DISABLE KEYS */;
INSERT INTO `tblficha` VALUES (1,1,5,1,'00:01:00','0','.'),(2,2,5,1,'00:01:00','0',''),(3,3,7,1,'00:01:00','0',''),(4,4,5,1,'00:01:00','0',''),(5,5,5,1,'00:01:00','0',''),(6,6,5,1,'00:01:00','0','a');
/*!40000 ALTER TABLE `tblficha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblfichadetalhes`
--

DROP TABLE IF EXISTS `tblfichadetalhes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblfichadetalhes` (
  `detId` int NOT NULL AUTO_INCREMENT,
  `detVariacao` varchar(50) DEFAULT NULL,
  `detCarga` varchar(50) DEFAULT NULL,
  `detSerie` varchar(10) DEFAULT NULL,
  `detRepeticao` varchar(50) DEFAULT NULL,
  `detIdFicha` int DEFAULT NULL,
  `detTreino` char(1) DEFAULT NULL,
  PRIMARY KEY (`detId`),
  KEY `detIdFicha` (`detIdFicha`),
  CONSTRAINT `tblfichadetalhes_ibfk_1` FOREIGN KEY (`detIdFicha`) REFERENCES `tblficha` (`ficId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfichadetalhes`
--

LOCK TABLES `tblfichadetalhes` WRITE;
/*!40000 ALTER TABLE `tblfichadetalhes` DISABLE KEYS */;
INSERT INTO `tblfichadetalhes` VALUES (1,'Remada2','10','10','10',1,'A'),(2,'Alongamento2','102','10','10',1,'B'),(3,'Pu Docks','10','10','10',1,'A'),(4,'Flexão','10','10','10',1,'C'),(5,'Alongamento2','102','10','10',3,'A'),(6,'Alongamento2','10','10','10',4,'A'),(7,'Alongamento','10','10','10',1,'A'),(8,'Flexao','10','10','10',1,'B'),(9,'Ponte','10','10','10',1,'C'),(10,'Alongamento','10','10','10',6,'A'),(11,'Remada','10','10','10',6,'B'),(12,'Pu Docks','10','10','10',6,'C');
/*!40000 ALTER TABLE `tblfichadetalhes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblfuncionario`
--

DROP TABLE IF EXISTS `tblfuncionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblfuncionario` (
  `funId` int NOT NULL AUTO_INCREMENT,
  `funNome` varchar(100) NOT NULL,
  `funCelular` varchar(15) NOT NULL,
  `funCep` varchar(10) DEFAULT NULL,
  `funCidade` varchar(30) DEFAULT NULL,
  `funEstado` varchar(30) DEFAULT NULL,
  `funRua` varchar(100) DEFAULT NULL,
  `funNumeroRua` int DEFAULT NULL,
  `funSexo` char(1) NOT NULL,
  `funCpf` varchar(15) NOT NULL,
  `funEmail` varchar(100) NOT NULL,
  `funDataCmc` datetime DEFAULT NULL,
  `funStatus` char(1) DEFAULT NULL,
  `funIdAcad` int DEFAULT NULL,
  `funSenha` varchar(200) NOT NULL,
  `funNivel` int NOT NULL,
  PRIMARY KEY (`funId`),
  KEY `funAcad` (`funIdAcad`),
  CONSTRAINT `tblfuncionario_ibfk_1` FOREIGN KEY (`funIdAcad`) REFERENCES `tblacademia` (`acaId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfuncionario`
--

LOCK TABLES `tblfuncionario` WRITE;
/*!40000 ALTER TABLE `tblfuncionario` DISABLE KEYS */;
INSERT INTO `tblfuncionario` VALUES (1,'Binarios','12996138271','12520110','Guaratinguetá','SP','Rua lala',29,'M','577.821.068-00','equipe@gmail.com','2024-04-11 00:00:00','1',NULL,'123123',3),(4,'Rodrigo','(12) 09381-0923','12570112','Aparecida','SP','Rua Alfredo Penido',10,'M','823.699.390-60','rodrigo@gmail.com','2024-04-11 08:49:43','1',1,'123123',2),(5,'Heitor','(12) 90381-9203','12570100','Aparecida','SP','Avenida Antonio Samaha',10,'M','059.494.500-35','heitor@gmail.com','1970-01-01 00:00:00','1',1,'123123',1),(6,'Daniel','(12) 83901-2930','12570100','Aparecida','SP','Avenida Antonio Samaha',10,'M','920.999.620-81','daniel@gmail.com','2024-04-11 00:00:00','0',1,'123123',1),(7,'Funcionario Happy Day','(91) 82309-1283','12570100','Aparecida','SP','Avenida Antonio Samaha',10,'M','720.423.250-07','happy@gmail.com','2024-04-12 09:12:15','0',1,'123123',1),(8,'func SKull gym','(19) 20381-2093','12520110','Guaratinguetá','SP','Rua Filadelfo Gandra Martins',10,'M','058.392.590-12','skull@gmail.com','2024-04-12 20:03:42','1',2,'123123',2);
/*!40000 ALTER TABLE `tblfuncionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblhorarios`
--

DROP TABLE IF EXISTS `tblhorarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblhorarios` (
  `horId` int NOT NULL AUTO_INCREMENT,
  `horInicio` time DEFAULT NULL,
  `horFim` time DEFAULT NULL,
  `horIdCliente` int DEFAULT NULL,
  `horIdAcad` int DEFAULT NULL,
  PRIMARY KEY (`horId`),
  KEY `fk_horCli` (`horIdCliente`),
  KEY `horAcad` (`horIdAcad`),
  CONSTRAINT `fk_horCli` FOREIGN KEY (`horIdCliente`) REFERENCES `tblcliente` (`cliId`),
  CONSTRAINT `tblhorarios_ibfk_1` FOREIGN KEY (`horIdAcad`) REFERENCES `tblacademia` (`acaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblhorarios`
--

LOCK TABLES `tblhorarios` WRITE;
/*!40000 ALTER TABLE `tblhorarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblhorarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblplanos`
--

DROP TABLE IF EXISTS `tblplanos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblplanos` (
  `plaId` int NOT NULL AUTO_INCREMENT,
  `plaNome` varchar(20) DEFAULT NULL,
  `plaPreco` double DEFAULT NULL,
  `plaQtdMes` int DEFAULT NULL,
  `plaIdAcad` int DEFAULT NULL,
  PRIMARY KEY (`plaId`),
  KEY `plaAcad` (`plaIdAcad`),
  CONSTRAINT `tblplanos_ibfk_1` FOREIGN KEY (`plaIdAcad`) REFERENCES `tblacademia` (`acaId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblplanos`
--

LOCK TABLES `tblplanos` WRITE;
/*!40000 ALTER TABLE `tblplanos` DISABLE KEYS */;
INSERT INTO `tblplanos` VALUES (1,'Plano Power',200,12,1);
/*!40000 ALTER TABLE `tblplanos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblplanosclientes`
--

DROP TABLE IF EXISTS `tblplanosclientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblplanosclientes` (
  `idPlano` int DEFAULT NULL,
  `idCliente` int DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  KEY `idPlano` (`idPlano`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `tblplanosclientes_ibfk_1` FOREIGN KEY (`idPlano`) REFERENCES `tblplanos` (`plaId`),
  CONSTRAINT `tblplanosclientes_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `tblcliente` (`cliId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblplanosclientes`
--

LOCK TABLES `tblplanosclientes` WRITE;
/*!40000 ALTER TABLE `tblplanosclientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblplanosclientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblsatisfacao`
--

DROP TABLE IF EXISTS `tblsatisfacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblsatisfacao` (
  `satId` int NOT NULL AUTO_INCREMENT,
  `satIdCliente` int DEFAULT NULL,
  `satIdAcademia` int DEFAULT NULL,
  `satNotaClareza` char(1) DEFAULT NULL,
  `satNotaConhecimento` char(1) DEFAULT NULL,
  `satNotaProatividade` char(1) DEFAULT NULL,
  `satNotaDisponibilidade` char(1) DEFAULT NULL,
  `satNotaSeguranca` char(1) DEFAULT NULL,
  `satIdAtendimento` int DEFAULT NULL,
  `satStatus` char(1) DEFAULT NULL,
  PRIMARY KEY (`satId`),
  KEY `satIdCliente` (`satIdCliente`),
  KEY `satIdAcademia` (`satIdAcademia`),
  KEY `satIdAtendimento` (`satIdAtendimento`),
  CONSTRAINT `tblsatisfacao_ibfk_1` FOREIGN KEY (`satIdCliente`) REFERENCES `tblcliente` (`cliId`),
  CONSTRAINT `tblsatisfacao_ibfk_3` FOREIGN KEY (`satIdAcademia`) REFERENCES `tblacademia` (`acaId`),
  CONSTRAINT `tblsatisfacao_ibfk_4` FOREIGN KEY (`satIdAtendimento`) REFERENCES `tblatendimento` (`ateId`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsatisfacao`
--

LOCK TABLES `tblsatisfacao` WRITE;
/*!40000 ALTER TABLE `tblsatisfacao` DISABLE KEYS */;
INSERT INTO `tblsatisfacao` VALUES (38,1,1,'4','4','4','4','4',85,'1'),(39,1,1,'3','4','3','1','0',86,'1'),(40,1,1,'4','4','4','4','4',87,'1'),(41,1,1,'2','3','1','4','4',88,'1'),(42,1,1,'4','4','4','4','4',89,'1'),(43,1,1,'4','4','4','4','4',90,'1'),(44,1,1,'4','4','4','4','4',91,'1'),(45,1,1,'4','4','4','4','4',92,'1'),(46,1,1,'3','4','4','4','4',93,'1'),(47,1,1,'3','2','4','2','3',94,'1'),(48,1,1,'4','4','4','4','4',95,'1'),(49,1,1,'4','4','4','4','4',96,'1'),(50,1,1,'4','4','4','4','4',97,'1'),(51,1,1,'4','4','4','4','4',98,'1'),(52,1,1,'4','4','4','4','4',99,'1'),(53,1,1,'4','4','4','4','4',100,'1'),(54,1,1,'3','4','2','1','4',101,'1'),(55,1,1,'2','3','2','2','2',102,'1');
/*!40000 ALTER TABLE `tblsatisfacao` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-14 11:50:58
