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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblacademia`
--

LOCK TABLES `tblacademia` WRITE;
/*!40000 ALTER TABLE `tblacademia` DISABLE KEYS */;
INSERT INTO `tblacademia` VALUES (1,'51.526.104/0001-75','Happy Day','2024-04-14','1','(12) 93819-2038','12570112','#cc0000','8129-0381');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblatendimento`
--

LOCK TABLES `tblatendimento` WRITE;
/*!40000 ALTER TABLE `tblatendimento` DISABLE KEYS */;
INSERT INTO `tblatendimento` VALUES (1,1,11,'2024-04-14 12:50:49',1,'0','2024-04-14 12:51:06');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcliente`
--

LOCK TABLES `tblcliente` WRITE;
/*!40000 ALTER TABLE `tblcliente` DISABLE KEYS */;
INSERT INTO `tblcliente` VALUES (1,'Yasmin','(12) 31238-9120','12570100','Aparecida','SP','Avenida Antonio Samaha',10,'F','089.498.710-09','yasmin@gmail.com','2024-04-14 12:49:35','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$RNpXfKGTYpa5ToE2OH4xIQ$uBB1yZZzV2SkLBVhjstkqbOUwkrrnOFnEu6zidtZ1j8');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfichadetalhes`
--

LOCK TABLES `tblfichadetalhes` WRITE;
/*!40000 ALTER TABLE `tblfichadetalhes` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfuncionario`
--

LOCK TABLES `tblfuncionario` WRITE;
/*!40000 ALTER TABLE `tblfuncionario` DISABLE KEYS */;
INSERT INTO `tblfuncionario` VALUES (1,'Binarios','12996138271','12520110','Guaratinguetá','SP','Rua lala',29,'M','577.821.068-00','equipe@gmail.com','2024-04-11 00:00:00','1',NULL,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE',3),(10,'Rodrigo','(12) 99613-8271','12520110','Guaratinguetá','SP','Rua Filadelfo Gandra Martins',10,'M','577.821.068-00','rodrigo@gmail.com','2024-04-14 12:48:21','1',1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE',2),(11,'Heitor','(19) 28301-9283','12570112','Aparecida','SP','Rua Alfredo Penido',10,'M','862.960.070-51','heitor@gmail.com','2024-04-14 12:50:34','1',1,'$argon2id$v=19$m=65536,t=3,p=4$hKH3skD1WFf6gZ/BlC1udA$YaLjB7v7hwBllxc0bOs3MJZpU4iU2K5V0x/4tuW7Kvw',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsatisfacao`
--

LOCK TABLES `tblsatisfacao` WRITE;
/*!40000 ALTER TABLE `tblsatisfacao` DISABLE KEYS */;
INSERT INTO `tblsatisfacao` VALUES (1,1,1,'4','4','4','4','4',1,'1');
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

-- Dump completed on 2024-04-14 12:54:19
