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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblacademia`
--

LOCK TABLES `tblacademia` WRITE;
/*!40000 ALTER TABLE `tblacademia` DISABLE KEYS */;
INSERT INTO `tblacademia` VALUES (1,'35.742.648/0001-18','HappyDay','2024-03-28','1','(12) 3105-7200','12570-114','#ff0000',''),(2,'07.594.978/0001-78','Smart Fit','2024-03-28','1','(11) 3365-0800','36062-340','#ffa200',''),(3,'11.472.527/0001-35','Esporte e ação','2024-03-28','1','(12) 3125-9225','12517-550','#e1ff00','');
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
  `ateDate` datetime DEFAULT NULL,
  `ateIdAcad` int NOT NULL,
  PRIMARY KEY (`ateId`),
  KEY `ateIdFuncionario` (`ateIdFuncionario`),
  KEY `ateIdAcad` (`ateIdAcad`),
  CONSTRAINT `tblatendimento_ibfk_1` FOREIGN KEY (`ateIdFuncionario`) REFERENCES `tblfuncionario` (`funId`),
  CONSTRAINT `tblatendimento_ibfk_2` FOREIGN KEY (`ateIdAcad`) REFERENCES `tblacademia` (`acaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblatendimento`
--

LOCK TABLES `tblatendimento` WRITE;
/*!40000 ALTER TABLE `tblatendimento` DISABLE KEYS */;
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
  `cliIdFun` int DEFAULT NULL,
  PRIMARY KEY (`cliId`),
  KEY `fk_cliPlano` (`cliPlano`),
  KEY `cliAcad` (`cliIdAcad`),
  KEY `cliIdFun` (`cliIdFun`),
  CONSTRAINT `fk_cliPlano` FOREIGN KEY (`cliPlano`) REFERENCES `tblplanos` (`plaId`),
  CONSTRAINT `tblcliente_ibfk_1` FOREIGN KEY (`cliIdAcad`) REFERENCES `tblacademia` (`acaId`),
  CONSTRAINT `tblcliente_ibfk_2` FOREIGN KEY (`cliIdFun`) REFERENCES `tblfuncionario` (`funId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcliente`
--

LOCK TABLES `tblcliente` WRITE;
/*!40000 ALTER TABLE `tblcliente` DISABLE KEYS */;
INSERT INTO `tblcliente` VALUES (1,'Cliente','12996138271','12520110','Guara','São Paulo','Rua lalalala',74,'M','5778218239','cliente@gmail.com','2022-02-13 00:00:00','1',1,1,'123123',1);
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
  `desIdAcad` int DEFAULT NULL,
  PRIMARY KEY (`desId`),
  KEY `desIdCliente` (`desIdCliente`),
  KEY `desIdAcad` (`desIdAcad`),
  CONSTRAINT `tbldesempenho_ibfk_1` FOREIGN KEY (`desIdCliente`) REFERENCES `tblcliente` (`cliId`),
  CONSTRAINT `tbldesempenho_ibfk_2` FOREIGN KEY (`desIdAcad`) REFERENCES `tblacademia` (`acaId`)
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
  PRIMARY KEY (`ficId`),
  KEY `fk_acaFic` (`ficIdAcademia`),
  KEY `fk_acaCli` (`ficIdCliente`),
  KEY `fk_funfic` (`ficIdFuncionario`),
  CONSTRAINT `fk_acaCli` FOREIGN KEY (`ficIdCliente`) REFERENCES `tblcliente` (`cliId`),
  CONSTRAINT `fk_acaFic` FOREIGN KEY (`ficIdAcademia`) REFERENCES `tblacademia` (`acaId`),
  CONSTRAINT `fk_funfic` FOREIGN KEY (`ficIdFuncionario`) REFERENCES `tblfuncionario` (`funId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblficha`
--

LOCK TABLES `tblficha` WRITE;
/*!40000 ALTER TABLE `tblficha` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblficha` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfuncionario`
--

LOCK TABLES `tblfuncionario` WRITE;
/*!40000 ALTER TABLE `tblfuncionario` DISABLE KEYS */;
INSERT INTO `tblfuncionario` VALUES (1,'Welinton','(12)99613-8271','12520110','Guaratingueta','SP','Rua Filadelfo Gandra Martins',74,'M','111.111.111-11','equipe@gmail.com','2022-02-13 00:00:00','1',NULL,'123123',3),(2,'Rodrigo','(12) 98850-3412','12570100','Aparecida','SP','Avenida Antonio Samaha',10,'M','490.370.978-71','rodrigo@gmail.com','2024-03-28 12:03:18','1',1,'123123',2);
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
-- Table structure for table `tblsatisfacaosistema`
--

DROP TABLE IF EXISTS `tblsatisfacaosistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblsatisfacaosistema` (
  `satId` int NOT NULL AUTO_INCREMENT,
  `satIdCliente` int DEFAULT NULL,
  `satIdFun` int DEFAULT NULL,
  `satNota` double DEFAULT NULL,
  `satMotivo` varchar(255) DEFAULT NULL,
  `satIdAcademia` int DEFAULT NULL,
  PRIMARY KEY (`satId`),
  KEY `satIdCliente` (`satIdCliente`),
  KEY `satIdFun` (`satIdFun`),
  KEY `satIdAcademia` (`satIdAcademia`),
  CONSTRAINT `tblsatisfacaosistema_ibfk_1` FOREIGN KEY (`satIdCliente`) REFERENCES `tblcliente` (`cliId`),
  CONSTRAINT `tblsatisfacaosistema_ibfk_2` FOREIGN KEY (`satIdFun`) REFERENCES `tblfuncionario` (`funId`),
  CONSTRAINT `tblsatisfacaosistema_ibfk_3` FOREIGN KEY (`satIdAcademia`) REFERENCES `tblacademia` (`acaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsatisfacaosistema`
--

LOCK TABLES `tblsatisfacaosistema` WRITE;
/*!40000 ALTER TABLE `tblsatisfacaosistema` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblsatisfacaosistema` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-28 12:37:03
