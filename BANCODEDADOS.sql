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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblacademia`
--

LOCK TABLES `tblacademia` WRITE;
/*!40000 ALTER TABLE `tblacademia` DISABLE KEYS */;
INSERT INTO `tblacademia` VALUES (1,'51.526.104/0001-75','Happy Day','2024-04-14','1','(12) 93819-2038','12570112','#cc0000','8129-0381'),(3,'26.234.372/0001-76','Skull Gym','2024-04-25','1','(19) 23819-0238','12520110','#000000','1298-3091'),(4,'07.594.978/0001-78','Smart Fit','2024-04-25','1','(19) 23890-1238','12570100','#ff9500','1298-3901');
/*!40000 ALTER TABLE `tblacademia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblaparelhos`
--

DROP TABLE IF EXISTS `tblaparelhos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblaparelhos` (
  `apaId` int NOT NULL AUTO_INCREMENT,
  `apaNome` varchar(100) DEFAULT NULL,
  `apaDataEntrada` date DEFAULT NULL,
  `apaDataSaida` date DEFAULT NULL,
  `apaStatus` char(1) DEFAULT NULL,
  `apaIdAcad` int DEFAULT NULL,
  PRIMARY KEY (`apaId`),
  KEY `apaIdAcad` (`apaIdAcad`),
  CONSTRAINT `tblaparelhos_ibfk_1` FOREIGN KEY (`apaIdAcad`) REFERENCES `tblacademia` (`acaId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblaparelhos`
--

LOCK TABLES `tblaparelhos` WRITE;
/*!40000 ALTER TABLE `tblaparelhos` DISABLE KEYS */;
INSERT INTO `tblaparelhos` VALUES (3,'Supino','2024-04-24',NULL,'1',1),(4,'Mesaa','2024-04-24',NULL,'1',1);
/*!40000 ALTER TABLE `tblaparelhos` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=584 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblatendimento`
--

LOCK TABLES `tblatendimento` WRITE;
/*!40000 ALTER TABLE `tblatendimento` DISABLE KEYS */;
INSERT INTO `tblatendimento` VALUES (537,82,11,'2024-01-22 13:14:09',1,'0','2024-03-26 21:25:04'),(538,74,13,'2024-01-01 07:52:36',1,'0','2024-04-05 01:47:35'),(539,116,11,'2024-01-10 08:17:19',1,'0','2024-04-11 21:47:54'),(540,67,13,'2024-02-27 19:23:17',1,'0','2024-03-10 13:49:27'),(541,16,11,'2023-12-12 18:36:17',1,'0','2024-02-16 07:57:28'),(542,37,12,'2023-11-07 17:27:09',1,'0','2023-12-04 07:06:26'),(543,18,11,'2023-10-28 08:39:54',1,'0','2024-01-17 22:12:08'),(544,80,13,'2024-03-03 16:22:04',1,'0','2024-04-10 07:10:54'),(546,119,12,'2024-03-12 14:50:04',1,'0','2024-03-26 01:15:05'),(547,42,12,'2023-11-13 05:58:47',1,'0','2024-01-12 11:56:30'),(548,130,11,'2024-01-11 02:02:10',1,'0','2024-04-16 07:36:30'),(549,89,12,'2024-04-14 14:08:24',1,'0','2024-04-15 00:26:57'),(550,89,11,'2024-02-27 09:10:04',1,'0','2024-03-17 09:35:19'),(551,21,13,'2023-12-08 17:16:05',1,'0','2023-12-14 18:20:30'),(552,139,12,'2023-10-28 10:14:09',1,'0','2023-11-15 17:55:28'),(553,26,11,'2024-03-16 01:14:00',1,'0','2024-04-03 03:05:10'),(554,19,12,'2024-03-30 11:05:47',1,'0','2024-04-14 20:05:15'),(555,70,13,'2023-11-27 03:53:03',1,'0','2023-12-10 06:00:42'),(556,38,13,'2023-10-07 12:55:23',1,'0','2023-11-24 23:06:19'),(557,87,12,'2023-12-26 03:29:32',1,'0','2024-03-12 22:35:24'),(558,135,13,'2024-04-16 09:35:02',1,'0','2024-04-16 09:49:58'),(559,15,13,'2023-11-12 05:02:14',1,'0','2023-12-23 03:32:58'),(560,44,12,'2023-12-29 19:38:45',1,'0','2024-03-16 03:03:43'),(561,25,13,'2023-10-23 14:38:04',1,'0','2024-03-10 03:34:05'),(563,121,11,'2024-01-31 01:12:47',1,'0','2024-03-18 00:41:35'),(564,117,12,'2024-04-10 03:25:51',1,'0','2024-04-15 05:26:36'),(565,129,11,'2024-04-13 08:23:29',1,'0','2024-04-14 10:11:15'),(566,65,13,'2023-12-30 02:38:50',1,'0','2024-04-05 05:23:40'),(567,129,13,'2024-04-17 10:50:28',1,'0','2024-04-17 10:50:57'),(568,33,11,'2024-04-17 21:39:06',1,'0','2024-04-17 21:39:09'),(569,1,11,'2024-04-18 19:49:13',1,'0','2024-04-18 19:49:35'),(570,1,11,'2024-04-19 11:33:07',1,'0','2024-04-19 11:33:40'),(571,1,11,'2024-04-19 11:34:02',1,'0','2024-04-19 11:34:07'),(572,111,11,'2024-04-20 19:13:37',1,'0','2024-04-20 19:13:38'),(573,1,11,'2024-04-20 19:36:07',1,'0','2024-04-20 19:36:10'),(574,1,11,'2024-04-20 19:37:39',1,'0','2024-04-20 19:37:42'),(575,1,11,'2024-04-20 19:39:13',1,'0','2024-04-20 19:39:13'),(576,1,11,'2024-04-20 19:39:26',1,'0','2024-04-20 19:39:44'),(577,1,11,'2024-04-21 09:34:58',1,'0','2024-04-21 09:35:00'),(578,130,12,'2024-04-22 23:41:26',1,'0','2024-04-22 23:41:30'),(579,1,11,'2024-04-22 23:55:50',1,'0','2024-04-23 19:31:36'),(580,49,11,'2024-04-23 19:31:22',1,'0','2024-04-23 19:31:32'),(581,1,11,'2024-04-24 19:53:39',1,'0','2024-04-24 19:53:43'),(582,1,11,'2024-04-25 08:13:58',1,'0','2024-04-25 08:13:59'),(583,1,12,'2024-04-25 08:45:50',1,'0','2024-04-25 08:47:33');
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
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcliente`
--

LOCK TABLES `tblcliente` WRITE;
/*!40000 ALTER TABLE `tblcliente` DISABLE KEYS */;
INSERT INTO `tblcliente` VALUES (1,'Yasmin','(12) 31238-9120','12570112','Aparecida','SP','Rua Alfredo Penido',10,'F','089.498.710-09','yasmin@gmail.com','2024-04-14 00:00:00','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(2,'Welinton','(12) 99613-8271','12520110','Guaratinguetá','SP','Rua Filadelfo Gandra Martins',74,'M','577.821.068-00','welinton@gmail.com','2024-04-16 11:04:14','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(3,'Ian','(18) 29038-1209','12570110','Aparecida','SP','Rua João Antonio de Oliveira',10,'M','309.148.180-82','ian@gmail.com','2024-04-16 00:00:00','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(15,'Molly Conroy','(785) 544-2099','49111-4784','Indio','Iowa','Torphy Plaza',8,'M','5316621693','Ole.Moore@yahoo.com','2024-03-21 18:33:03','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(16,'Jeannette Moore','(318) 898-1816','95166-1550','South Charlene','Oklahoma','Bernhard Light',59,'M','27323696296','Bradly.Hyatt66@yahoo.com','2024-03-20 13:42:29','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(17,'Herbert Osinski','1-818-624-1576','43319-1230','Lake Adahbury','Minnesota','Princess Mission',40,'M','51760388421','Helmer.Schmidt51@yahoo.com','2023-10-23 12:24:33','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(18,'Marcella Dibbert','500.854.2762','74549','New Beatrice','Pennsylvania','Corbin Overpass',42,'F','14591219415','Toni.Paucek43@gmail.com','2023-11-20 00:56:05','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(19,'Earnest Donnelly DDS','8187466161','40241-3050','Port Octavia','New Mexico','Legros Mall',31,'M','24382557836','Nelson.Dickinson@gmail.com','2023-07-13 14:46:25','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(20,'Debra Simonis','71632082434','66181-6591','North Ole','Maryland','Smith Station',22,'M','4729412007','Marcus.Donnelly92@yahoo.com','2024-01-27 03:27:14','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(21,'Jane Sauer','26823898823','76808','Hartford','Rhode Island','Reynolds Prairie',39,'F','45631953724','Juana_Keeling58@yahoo.com','2024-02-26 12:27:26','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(22,'Lula Bradtke','80110346362','98072','North Pearlinetown','Ohio','Yost Center',85,'M','61293560219','Jolie98@yahoo.com','2023-12-30 22:30:24','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(23,'Lauren Wehner','13640058995','48378-5953','Heberfurt','California','Carlie Green',3,'M','27288118377','Barney37@gmail.com','2024-02-24 12:07:34','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(24,'Mr. Della Schinner','45635290769','12783','Muellerhaven','Massachusetts','Lelah Vista',16,'M','33834107336','Dale.Heller66@gmail.com','2023-05-05 17:17:28','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(25,'Lewis Durgan','12891202350','87360-4670','Portage','New Jersey','Tad Corner',91,'M','22052327287','Yoshiko_McClure@hotmail.com','2023-05-10 17:41:17','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(26,'Karl Prohaska','85478671104','44795-2629','Hyattfort','Connecticut','Stroman Trace',94,'F','22437387704','Guillermo82@yahoo.com','2023-08-31 19:13:30','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(27,'Edward Beier','14083334128','61101-1057','Padbergborough','Virginia','Mallie Cove',13,'F','51633978728','Ollie.Fay54@hotmail.com','2024-02-01 02:45:40','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(28,'Nina Kautzer','64259401895','11385-0134','Port Prudenceside','West Virginia','Lenore Turnpike',62,'F','45524939987','Citlalli7@gmail.com','2023-10-17 17:51:31','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(29,'Jessica Stokes DVM','34184158709','82022','Port Danafurt','Rhode Island','Shane Stravenue',29,'F','53756816312','Fern70@yahoo.com','2023-09-06 23:20:37','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(30,'Jerald Jaskolski','99651960888','98280-3046','Delbertberg','Connecticut','Shayne Falls',74,'M','1390938065','Lennie_Okuneva@gmail.com','2024-01-14 03:29:54','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(31,'Steven Johnston','27318759378','22686-7107','Port Rudy','Oklahoma','Towne Manors',38,'M','25850775348','Natalia_Cronin@hotmail.com','2023-06-27 04:56:54','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(32,'Enrique Wunsch Jr.','526879145','70384-2083','Lake Kolby','Minnesota','Lehner Estates',65,'F','54092447180','Ettie.Lynch@hotmail.com','2023-09-06 15:04:26','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(33,'Roberta Gleichner','66857276018','86201-8538','East Rocky','Maine','Kuphal Drive',14,'F','20161466416','Felicity.Walsh10@yahoo.com','2024-01-23 17:08:51','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(34,'Dr. Floyd Hettinger','29064527805','64660','Buckchester','Vermont','Jaren Shoal',86,'F','86471901996','Verlie_Schowalter25@hotmail.com','2023-10-17 06:05:57','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(35,'Kimberly Schowalter','82306217565','40335','Kenosha','Arizona','Clemmie Lodge',50,'M','96318087866','Anjali_Beier@hotmail.com','2023-06-16 19:04:13','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(36,'Harold Block','24273936334','91319-1449','Austin','Nebraska','Randy Locks',35,'M','13661471335','Andre45@gmail.com','2023-06-29 14:36:39','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(37,'Gail Vandervort','7878763461','78610-9229','Kuhicmouth','Pennsylvania','Lynch Shoal',84,'F','90633086720','Celestine_Rice9@yahoo.com','2023-06-05 14:20:03','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(38,'Milton Shanahan II','22697135526','47072','Cummingsfort','South Dakota','Dorothea Roads',8,'F','37439908552','Landen29@gmail.com','2023-12-23 20:19:35','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(39,'Rolando Rosenbaum PhD','72431995696','53245','Jordaneside','Illinois','Schuppe Knolls',92,'M','47657830826','Zechariah.Ziemann59@gmail.com','2023-09-27 06:56:58','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(40,'Violet Batz','66085247090','42586','Edinburg','Connecticut','Trent Trail',1,'F','77840504865','Kathlyn.Hermann1@yahoo.com','2023-10-03 01:41:38','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(41,'Terrance Waters','45974175259','98727-3824','Claudiemouth','Nebraska','Herman Trafficway',78,'M','51352255465','Mireya.Braun69@hotmail.com','2023-10-13 22:27:28','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(42,'Andres Wisozk','83247072971','17931-8029','Plymouth','Colorado','Raphaelle Parkway',13,'M','9936475544','Lawrence3@yahoo.com','2023-08-20 08:31:36','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(43,'Nora Schulist','89028400066','50975','North Gilberto','Arizona','Bennett Oval',11,'M','93470742041','Joel34@gmail.com','2024-01-12 01:48:20','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(44,'Wade Rice','36660427693','40246','Azusa','Arizona','Glover Junctions',99,'M','4001431679','Earnest.Feil31@yahoo.com','2023-05-18 23:48:54','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(45,'Genevieve Schulist','15935315378','01324-5865','Lorainemouth','New Jersey','Rippin Coves',96,'M','51153789693','Milan29@yahoo.com','2024-03-19 23:57:27','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(46,'Caleb Brekke','99122481094','36725','Citrus Heights','Rhode Island','Price Underpass',77,'F','37165772495','Colby_OKeefe78@gmail.com','2023-07-25 21:12:57','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(47,'Hugo Johnston','41221807082','86611','Blickfort','Florida','Clare Mission',69,'M','88781705382','Lonzo71@yahoo.com','2023-12-10 16:53:35','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(48,'Earnest Nitzsche','63445660215','98943-9158','East Wilson','California','Hauck Lights',3,'F','81872722436','Stevie93@hotmail.com','2024-02-26 09:26:49','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(49,'Antonia Kovacek','45855432841','45921-1475','Iowa City','Arkansas','Abdiel Ramp',15,'F','21665996173','Frederique25@gmail.com','2023-10-04 03:02:13','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(50,'Delbert Spencer II','6831253762','26817','Steuberfurt','Maine','Oral Station',3,'F','46662716916','Keshawn84@hotmail.com','2023-11-21 08:20:53','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(51,'Viola Weimann','86874441104','94017','Temecula','North Dakota','Evelyn Ports',98,'F','96097493451','Marcella_Pagac@yahoo.com','2023-10-11 15:15:56','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(52,'Stuart Donnelly','2528213500','70701-6856','Lake Jace','Wyoming','Savanna Circle',35,'M','3838757635','Hailee.Wisozk@gmail.com','2023-08-21 03:55:03','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(53,'Dr. Fredrick Parker','46206352044','58239','South Maxwell','Illinois','Einar Streets',22,'F','98475394514','Leann97@hotmail.com','2024-02-14 22:48:13','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(54,'Mrs. Nettie Hills','49420624529','46192','Madera','Montana','Loy Well',4,'F','8219795278','Charity.Wiza56@gmail.com','2023-06-21 20:32:05','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(55,'Benjamin Sauer','79242540406','09807','Klockofurt','Arizona','Funk Key',72,'M','54008357622','Omari53@gmail.com','2023-05-05 20:56:51','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(56,'Bessie Zulauf','79401602875','74138-9840','North Matildamouth','Arkansas','Wisozk Spur',79,'M','82571858004','Ericka90@hotmail.com','2023-08-17 14:55:26','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(57,'Mr. Olga Blanda','59204119862','71358','Ferryberg','Kansas','Aida Way',18,'F','61573816486','Blaise76@gmail.com','2023-09-20 19:37:18','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(58,'Laurie Gibson','21476966771','87899-6359','West Deronmouth','Illinois','Steuber Island',21,'F','38878133962','Ronaldo27@gmail.com','2023-06-27 04:38:13','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(59,'Terrell Lynch','5055023427','37206','North Bailey','Maryland','Adolph Mount',31,'F','81060117087','Mavis_Johnson75@yahoo.com','2023-07-06 15:31:57','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(60,'Belinda Torphy','97973532555','02328-1469','New Chandlerview','Kansas','Lueilwitz Fords',30,'M','87137194164','Waylon_Carter@hotmail.com','2023-08-16 18:55:38','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(61,'Dr. Rosie Stark','26848364691','64700','North Lucioburgh','Arkansas','Jeff Freeway',62,'M','7774495100','Celestino68@gmail.com','2023-10-07 15:15:51','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(62,'Irene Johnson','4366554180','56643','North Eleanora','Maine','Shields Fort',39,'F','19210252678','Lilian.Schinner@gmail.com','2023-11-27 03:06:05','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(63,'Kristina Jerde','76317020901','68321','Richland','Michigan','Zemlak Loop',48,'F','5876690289','Robin21@gmail.com','2023-12-31 04:35:12','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(64,'Heidi Abbott','59390675090','94345-6727','North Trystan','Oregon','Timothy Shores',76,'M','4400439257','Shayne64@gmail.com','2023-10-19 08:00:10','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(65,'Sally Dietrich Sr.','48862988688','55826-3456','Port Tate','Pennsylvania','Mosciski Road',81,'M','99144199839','Brook16@hotmail.com','2023-10-01 07:47:44','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(66,'Herman Wisoky IV','44748773635','39166','Murrieta','Oklahoma','Hayes Manors',45,'M','19900878006','Guy_Torphy70@hotmail.com','2023-10-27 06:03:00','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(67,'Erick Kshlerin','7931384677','31801','Spokane Valley','Wyoming','Russel Park',44,'F','43753034807','Jessika.Thompson@gmail.com','2024-01-08 17:59:31','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(68,'Sabrina Collins','33439895021','77860-2900','Lake Ednaview','Utah','Fadel Cape',13,'F','82571728364','Princess_Kilback46@gmail.com','2024-03-16 00:14:51','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(69,'Abel Steuber','148391537','46459-4554','West Tamara','Nevada','Joshua Forest',73,'F','43648805585','Annabell.Mitchell85@gmail.com','2024-01-01 00:00:00','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(70,'Cora Fahey','60182659700','44611','Schinnerburgh','Iowa','Bradtke Throughway',16,'F','93361511523','Kattie.Kozey@hotmail.com','2023-06-18 05:17:26','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(71,'Archie Sipes','53284028172','46325','Guillermohaven','New Mexico','Ena Keys',48,'M','80842499597','Yvonne.Gibson@hotmail.com','2023-10-21 20:03:48','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(72,'Courtney Ortiz','4927262105','65341','Skokie','Maryland','Monahan Forks',63,'M','28103150730','Jerel_Tillman89@yahoo.com','2023-07-25 09:27:50','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(73,'Darla Bergnaum','52259720652','71966','Tomfurt','Maryland','Schuppe Lane',76,'M','5140300141','Pansy91@yahoo.com','2023-09-18 16:02:00','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(74,'Alicia Walker','20699186273','34600','Pfannerstillside','Nevada','Vandervort Light',10,'M','79994943342','Bo_Berge43@hotmail.com','2023-05-15 23:23:33','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(75,'Kirk Gibson','407940079','96121-4063','Gutkowskiborough','Wisconsin','Henriette Streets',63,'F','63851323886','Tania.Schamberger@gmail.com','2023-09-18 04:11:38','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(76,'Arlene Robel','94045817758','90864','Pagacport','Alaska','Boyer Summit',98,'F','27351011871','Sandrine79@yahoo.com','2024-03-18 09:44:35','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(77,'Dave Ferry','18986813211','97460','Maxiebury','Oklahoma','Meghan Plaza',41,'F','33167864521','Howard96@hotmail.com','2023-12-13 11:09:32','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(78,'Dana Schmidt Sr.','2456403453','35514','Albany','Connecticut','Hilpert Isle',56,'M','80739669804','Tremaine14@yahoo.com','2024-03-22 08:12:54','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(79,'Kristie Mraz','35625075851','48605-2271','St. Joseph','Vermont','Mayert Manor',61,'M','58076672349','Glen_Jacobi55@yahoo.com','2023-05-22 17:02:51','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(80,'Sandra Smitham','12265463615','81733','Odessaville','Wisconsin','Tressie Haven',49,'M','5093989474','Kelli.Luettgen82@yahoo.com','2023-12-02 23:41:50','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(81,'Jane Cartwright','25743888248','92949','South Jude','Maryland','Rath Mall',3,'M','93141482002','Maryjane98@hotmail.com','2023-10-22 17:58:05','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(82,'Penny Jenkins','40406036609','58063-8319','North Lewburgh','Oklahoma','Gladyce Gateway',50,'F','30488597718','Laney_Bosco37@gmail.com','2023-10-08 14:25:14','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(83,'Belinda Ferry','45295268157','95270','Lake Bridieburgh','Wisconsin','Annetta Crossroad',59,'F','68133742222','Rosemary_Kshlerin@yahoo.com','2023-05-08 05:28:35','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(84,'Glenda Watsica','92849034606','19181-7373','Port Olenhaven','Kansas','Lenore Shore',43,'M','16882597142','Alvera_Jacobi40@gmail.com','2024-02-18 21:45:48','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(85,'Kathleen Kilback','38260912965','78257-0723','Zboncakside','Rhode Island','Cordie Causeway',50,'F','31621033628','Leopoldo_Nolan34@yahoo.com','2023-08-09 19:45:40','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(86,'Peggy Beahan','69070360297','77629-8266','South Lucy','South Carolina','Satterfield Point',31,'M','62542811641','Christ93@gmail.com','2023-09-26 08:16:50','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(87,'Ian Dare','80676821735','88667-1937','Port Camren','South Carolina','Johnston Mills',25,'M','74116556392','Woodrow9@gmail.com','2024-02-18 06:18:06','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(88,'Jeremiah Ullrich','37247315887','10861-1198','Beierview','Vermont','Swaniawski Terrace',41,'M','24860463850','Winnifred.Stoltenberg29@hotmail.com','2023-10-10 04:25:25','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(89,'Jody Upton','94710616138','98535-4228','Farmington','Michigan','Lowe Terrace',23,'F','94029970932','Kenneth9@yahoo.com','2023-07-10 13:21:13','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(90,'Sue Ortiz','78800638299','78515-7252','Troy','Pennsylvania','Rowe Keys',58,'M','46565663442','Torrance23@gmail.com','2023-10-01 16:58:43','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(91,'Matthew Boehm','87969246786','55714','New Elizabethchester','Alaska','Jacobi Point',26,'F','87619661795','Edward.Rempel@gmail.com','2024-01-06 02:59:27','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(92,'Ruth Brakus','954910647','64676-8868','North Piperchester','Maryland','Derrick Harbor',43,'F','68712320062','Norwood91@yahoo.com','2023-08-23 08:53:29','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(93,'June Kris','92210723715','28726','Wildermantown','California','Oleta Burgs',17,'M','47306344076','Dee_Wisozk1@yahoo.com','2023-05-10 09:25:05','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(94,'Bernard Reichert','50716182473','90117','New Lorenz','Maryland','Carter Shoal',60,'F','23966572270','Marion_Rutherford64@hotmail.com','2023-08-08 17:52:16','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(95,'Rebecca Schulist','74787053931','25855-1199','New Jacksonmouth','Kansas','Salvador Ville',20,'M','71993476222','Jovan.Tromp69@gmail.com','2023-10-20 12:12:56','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(96,'Molly Brakus','38209464540','54545-9897','Casa Grande','Oregon','Kemmer Motorway',99,'M','78978983242','Wilmer78@gmail.com','2023-11-25 04:26:03','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(97,'Francis Daniel','74573076609','91776-3914','Woodbury','Iowa','Clay Summit',53,'F','69409856386','Celine.Deckow@yahoo.com','2023-09-25 01:38:37','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(98,'Earnest Bins','95834173262','71781','Mrazhaven','Nebraska','Tyrese Forge',75,'M','1054077246','Dwight_Franecki75@yahoo.com','2024-01-08 19:28:22','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(99,'Dr. Derek Grant','23399410233','42272-3627','Konopelskiville','Massachusetts','Funk Gateway',23,'F','62958750571','Marcellus82@hotmail.com','2023-06-30 13:17:42','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(100,'Daisy Stokes','55265088379','18835-9738','Pontiac','South Carolina','Will Drives',64,'F','24145850352','Amie.Kertzmann@yahoo.com','2023-09-27 16:19:46','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(101,'Fannie Larson','60593244316','04051-6212','Marianeshire','Maryland','Hyman Drive',58,'M','84594425396','Tyreek71@hotmail.com','2023-06-10 15:26:01','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(102,'Hannah Volkman','59012154047','26410','Metzberg','Wisconsin','Ryann Ridges',9,'F','54353377805','Cicero85@gmail.com','2024-03-18 13:32:34','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(103,'Tyler Williamson','31461733905','35565-3194','Schimmelberg','Massachusetts','Walker Way',56,'F','61537951324','Brannon87@gmail.com','2024-01-03 00:26:03','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(104,'Terence VonRueden','63703624135','11617','Jasperside','Rhode Island','Berry Corner',24,'M','5583509989','Maynard.Tromp52@gmail.com','2023-06-23 15:15:53','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(105,'Freda Hammes','72822571825','10655-5209','New Kiana','Arkansas','Celia Plain',42,'F','60503754508','Hobart_Willms32@yahoo.com','2023-04-22 06:33:13','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(106,'Kristen Weber Sr.','88265781989','84153','Bergnaumland','North Carolina','Camren Glen',79,'M','6662695598','Tomas.Gerhold25@hotmail.com','2023-05-18 05:37:31','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(107,'Omar Rodriguez','32998855412','85472','Alexandria','Delaware','Rylee Viaduct',74,'F','54126818990','Adan.Ortiz@yahoo.com','2024-01-09 06:29:57','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(108,'Lynn Boyle DDS','69497536425','48812','Abnerview','Virginia','O\'Reilly Alley',82,'M','27096947631','Alejandra.Gislason15@gmail.com','2023-10-22 14:52:10','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(109,'Ms. Cathy Klein','8754373411','77136-0099','South Bend','Massachusetts','Dare Islands',13,'F','38397958991','Bridgette95@hotmail.com','2024-03-19 10:59:39','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(110,'Ms. Rufus Nolan','77676437236','71583-9334','New Van','Vermont','West Via',30,'M','28108183690','Noemy13@yahoo.com','2024-02-08 09:18:54','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(111,'Amelia Heidenreich DVMM','49428029637','94029','Jermeybury','Texas','Libbie Expressway',2,'M','20391880115','Eda.Schroeder@gmail.com','2023-05-07 00:00:00','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(112,'Orville Botsford','97648077085','84240','Lake Bradenborough','New Jersey','Mattie Avenue',17,'F','71541962679','Aidan_Kling@hotmail.com','2024-03-17 01:00:48','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(113,'Catherine Walter','46143596386','38583','Dickinsonshire','Idaho','Eloisa Corners',6,'M','40867425897','Maryse_Feest1@yahoo.com','2023-09-18 01:13:01','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(114,'Floyd Hoeger','35707077058','05818-3082','East Kevon','Louisiana','Yadira Plaza',54,'M','65434945933','Alexis84@yahoo.com','2023-07-19 06:16:13','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(115,'Christopher Leffler','30244996980','11910-4992','Lake Ricardochester','Wyoming','Jacey Manors',98,'F','91736541711','Ferne.Dietrich8@gmail.com','2024-03-18 08:22:21','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(116,'Jonathan Kunze','60631690267','09489-3414','East Pauline','Texas','Haag Streets',84,'M','17682928196','Aletha.Durgan@gmail.com','2023-10-15 16:58:25','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(117,'Nick Lowe','25385614950','81018-2553','New Bernitashire','Wisconsin','Theo Manor',99,'F','238439254','Eliza.Ernser@gmail.com','2023-08-27 15:51:40','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(118,'Miss Howard Kling','22183374036','59841-5807','State College','Idaho','Orn Isle',61,'F','84816384781','Ava.Lehner57@yahoo.com','2023-05-19 11:39:57','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(119,'Ms. Lindsay Hirthe','34996326942','28448-8898','East Bert','Nebraska','Graham Flat',14,'F','32917771651','Kolby_Turner68@gmail.com','2023-05-25 06:11:00','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(120,'Nadine Prosacco MD','2046433836','35231','West Dedrickstad','Idaho','Emiliano Route',100,'M','33867538603','Jonathan9@gmail.com','2023-05-03 04:24:04','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(121,'Miss Delbert Steuber','2658597892','43772-9220','Colemanton','Massachusetts','Nora Coves',72,'F','75794864026','Dalton.Strosin78@gmail.com','2024-03-23 18:42:21','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(122,'Wilfred Cormier DDS','84905935591','32404-8565','West Santosfurt','West Virginia','Bernhard Corners',75,'M','68414301355','Jonas.Shields43@hotmail.com','2023-06-12 01:35:32','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(123,'Bennie Cremin','37817899906','71090','Lake Kianna','Rhode Island','Freida Stream',1,'F','86701745353','Tanner.Brown18@yahoo.com','2023-10-08 14:28:02','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(124,'Bradford Turcotte','20577529049','35682-6574','Murrieta','Idaho','Wehner Heights',86,'F','81353718996','Elza_Haley5@yahoo.com','2024-02-18 09:02:55','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(125,'Levi Beahan','92518921964','39424-3157','South Travis','Georgia','Jaclyn Village',59,'F','17324965796','Elinore_OHara4@hotmail.com','2024-04-10 05:09:25','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(126,'Cecelia Feeney','15272379526','82208-6669','New Taramouth','Kansas','Easton Canyon',78,'F','83742857491','Kendra.Haley@yahoo.com','2023-06-09 05:36:26','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(127,'Holly Bruen','14588346029','19989-3813','Lourdesshire','Virginia','Erik Lights',73,'F','72995726624','Jaclyn_Walsh@hotmail.com','2023-11-12 03:27:46','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(128,'Lela Grady','41575513826','02597','Kraigville','Ohio','Keanu Extensions',85,'M','34706243104','Leta_Von@gmail.com','2024-02-28 09:25:30','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(129,'Levi Christiansen','79063978814','61793-9217','Powlowskiville','Arizona','Lee Knolls',7,'F','79215741832','Edyth.Reynolds@yahoo.com','2023-08-04 08:12:43','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(130,'Amy Hane','37453057197','06923-0831','Jaceview','Hawaii','Baumbach Shore',59,'F','4756944999','Kip_Mann62@gmail.com','2023-10-26 19:33:30','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(131,'Josh Braun','27128793485','16407','Belleland','Alaska','Margot Trail',11,'M','16009779297','Kelli_Kshlerin48@yahoo.com','2023-12-14 19:54:35','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(132,'Michael McGlynn','982886925','07809-7153','Giovannaview','Oregon','Julius Port',75,'F','35918862558','Vivien_Ortiz5@yahoo.com','2024-04-06 00:57:50','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(133,'Alma Roobb','93558548879','89282','East Lucytown','West Virginia','Carroll Viaduct',17,'F','38804132957','Cecile.Jakubowski22@hotmail.com','2023-07-25 00:00:00','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(134,'Andrew Larkin','3732489049','08918-8104','Haleymouth','Hawaii','Nikolaus Station',65,'F','45661748270','Tyree_Bruen@yahoo.com','2024-01-28 22:42:45','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(135,'John Hackett','65648044599','40543','New Ron','Mississippi','Alisha Freeway',61,'F','83717367425','Sylvia.Lakin@yahoo.com','2023-05-29 13:35:16','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(136,'Roberta Friesen','65205376385','27626-9568','Nolanmouth','New York','Xzavier Shoals',71,'M','82442100206','Alvera_Sporer57@yahoo.com','2023-12-13 20:31:20','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(137,'Shari Fadel','38096329779','91660-7441','North Royfort','Oregon','Donnelly Mill',18,'F','79465118004','Reanna_Bergstrom@hotmail.com','2024-04-10 22:35:21','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(138,'Julian Abernathy','66672252072','50326','Rosieton','Vermont','Mann Corner',18,'F','68462421000','Roberta.Willms@gmail.com','2023-10-20 11:11:05','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(139,'Kirk Kemmer II','3710564970','96992','Wernerton','Utah','Pouros Flat',55,'M','44097667932','Felicita.Waelchi@yahoo.com','2023-11-27 14:03:09','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(140,'Mr. Pat Rice','95051678386','13594-3920','Port Art','Connecticut','Lowe Shoal',12,'F','56852267938','Lina_DuBuque35@gmail.com','2023-06-10 07:29:08','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(141,'Joyce Bednar','5532599682','06489-1902','North Kylie','Connecticut','Bayer Flats',38,'F','35515497205','Rico2@gmail.com','2023-09-18 22:52:19','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(142,'Glenda Herman','27927056280','89190','Gerlachstad','New York','Hattie Village',5,'F','73656764859','Elisabeth_Lynch@yahoo.com','2023-05-25 09:53:59','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(143,'Orville Becker','73022433253','52783','Carmelbury','Texas','Schroeder Causeway',73,'F','82206165976','Murl_Prosacco@hotmail.com','2023-10-29 09:58:10','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(144,'Jasmine Paucek','98778691468','25035-1773','Oro Valley','Michigan','Larson Fork',62,'F','7749212509','Delilah_Farrell@hotmail.com','2023-08-14 16:35:02','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(145,'Leo Robel','37191226170','94968-8376','New Patienceborough','New Hampshire','Wisoky Streets',79,'M','34606430795','Brielle.OConnell80@yahoo.com','2023-08-26 09:06:05','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(146,'Nicolas Bruen','69043749966','43874-2698','West Diana','Missouri','Destany Mall',31,'F','24946064292','Kurtis74@hotmail.com','2023-12-26 19:12:30','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(147,'Ramiro Schulist','44374033249','94078','Volkmanville','Oregon','Dickens Port',6,'F','14580194721','Ronaldo9@gmail.com','2024-04-06 16:12:30','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(148,'Jessie Bahringer','23034021747','63777-6107','East Bonnie','Kansas','Doyle Brooks',47,'F','64011120214','Guiseppe15@gmail.com','2024-03-08 01:47:08','0',1,1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE'),(149,'Cliente novoo','(12) 39901-2931','12520110','Guaratinguetá','SP','Rua Filadelfo Gandra Martins',10,'M','127.194.030-24','cliente@gmail.com','2024-04-20 00:00:00','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$ajGZb0RIxBiK1t47IW0a6Q$sbbUYY3R36NOf9k8vAdN9q5b8XfjIipvAQgmV62S0GI'),(150,'Cleiton','(18) 23812-0938','12570110','Aparecida','SP','Rua João Antonio de Oliveira',10,'F','950.490.110-78','cleiton@gmail.com','2024-04-20 19:15:59','1',1,1,'$argon2id$v=19$m=65536,t=3,p=4$vwGTMy6Sxym8cG/15oIcxA$GSXiwPObnUiZg00nmv+jre2Hb4d6LtTCpxN5JzIrKyY');
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbldesempenho`
--

LOCK TABLES `tbldesempenho` WRITE;
/*!40000 ALTER TABLE `tbldesempenho` DISABLE KEYS */;
INSERT INTO `tbldesempenho` VALUES (2,1,'2024-03-03',74,15),(5,1,'2024-03-22',44,12),(7,1,'2023-10-15',52,1),(8,1,'2023-12-30',41,10),(9,1,'2023-11-09',61,7),(10,1,'2024-01-29',61,8),(11,1,'2023-10-04',57,11),(12,1,'2024-01-18',87,8),(13,1,'2024-03-20',78,13),(15,1,'2023-10-25',60,18),(18,1,'2023-12-23',54,12),(19,1,'2023-11-15',78,4),(21,1,'2023-12-14',50,2),(24,1,'2023-12-31',52,9),(28,1,'2024-03-29',55,3);
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
  `engIdAcad` int DEFAULT NULL,
  PRIMARY KEY (`engId`),
  KEY `engIdCliente` (`engIdCliente`),
  CONSTRAINT `tblengajamento_ibfk_1` FOREIGN KEY (`engIdCliente`) REFERENCES `tblcliente` (`cliId`)
) ENGINE=InnoDB AUTO_INCREMENT=226 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblengajamento`
--

LOCK TABLES `tblengajamento` WRITE;
/*!40000 ALTER TABLE `tblengajamento` DISABLE KEYS */;
INSERT INTO `tblengajamento` VALUES (2,16,'2024-01-27 06:08:18',1),(3,82,'2024-04-10 04:37:24',0),(4,125,'2024-01-28 21:53:07',0),(5,132,'2023-11-20 05:43:30',1),(6,42,'2024-01-02 21:01:56',1),(8,77,'2024-04-11 01:46:11',1),(9,81,'2024-02-23 11:39:03',1),(10,149,'2024-02-13 21:12:23',0),(12,100,'2023-12-13 21:35:41',1),(13,59,'2023-12-11 22:12:16',0),(14,56,'2024-04-06 05:35:04',1),(15,87,'2024-02-25 16:27:31',0),(16,79,'2024-03-16 18:20:50',0),(17,113,'2023-11-24 00:56:42',0),(18,121,'2024-02-02 16:05:11',1),(19,73,'2023-12-07 11:27:24',1),(20,50,'2024-04-12 03:06:53',1),(21,78,'2024-02-23 11:14:32',1),(22,144,'2024-01-15 10:18:38',0),(23,52,'2024-04-05 09:46:10',1),(24,45,'2024-01-15 02:17:27',0),(25,98,'2024-02-02 19:28:27',0),(26,52,'2023-11-10 02:25:31',1),(27,142,'2024-01-26 10:00:59',0),(28,26,'2023-12-04 16:50:00',1),(29,38,'2024-04-06 03:53:08',0),(30,94,'2024-02-17 18:04:23',1),(31,144,'2023-12-16 11:48:49',0),(32,127,'2024-03-28 09:52:53',1),(33,133,'2024-03-18 17:43:04',0),(34,27,'2023-12-01 06:39:37',0),(35,66,'2024-03-24 20:27:14',0),(36,95,'2024-03-02 08:16:48',1),(37,70,'2023-10-23 13:13:12',1),(38,117,'2024-03-25 00:54:41',0),(39,129,'2024-02-13 13:19:19',1),(40,120,'2023-10-09 11:33:06',1),(41,87,'2023-11-03 21:09:01',1),(42,55,'2024-02-29 20:49:06',1),(43,109,'2024-01-24 04:35:21',1),(44,53,'2024-04-02 02:54:36',0),(45,57,'2024-03-17 10:37:02',1),(46,118,'2023-11-05 04:29:02',0),(48,36,'2024-02-11 16:27:27',0),(49,88,'2024-01-21 06:47:27',0),(50,137,'2024-04-14 03:58:55',0),(51,142,'2024-03-03 12:28:01',1),(52,51,'2023-11-20 01:07:04',1),(53,108,'2024-03-21 18:35:27',1),(54,99,'2024-02-13 15:49:31',0),(55,127,'2023-12-23 02:02:35',1),(56,87,'2024-03-08 07:36:24',0),(57,74,'2024-03-07 17:09:18',0),(58,140,'2024-04-01 19:36:36',1),(59,32,'2024-03-14 22:45:58',0),(60,134,'2024-03-28 05:26:48',1),(61,133,'2023-12-11 11:09:08',1),(62,55,'2024-03-10 09:58:21',0),(63,99,'2023-11-19 22:25:56',0),(64,28,'2024-04-02 19:14:46',1),(66,65,'2023-10-29 19:19:05',1),(67,97,'2024-02-15 23:05:03',1),(68,58,'2024-04-03 00:54:51',1),(69,32,'2024-03-27 06:24:13',0),(70,134,'2024-02-03 11:22:26',0),(71,134,'2024-02-13 10:37:18',1),(72,134,'2024-03-06 07:39:35',1),(73,129,'2024-04-04 18:47:10',0),(74,109,'2023-11-22 02:52:04',1),(75,26,'2023-12-25 06:49:38',1),(76,1,'2023-12-27 17:50:37',1),(77,66,'2024-01-09 11:27:29',1),(78,94,'2023-12-30 12:31:53',1),(79,117,'2024-03-30 07:22:19',0),(80,22,'2023-12-10 12:14:13',0),(81,81,'2023-10-28 20:25:45',1),(82,99,'2024-02-14 05:57:45',0),(83,94,'2024-01-08 18:05:29',0),(84,87,'2023-11-16 00:22:52',1),(85,96,'2024-02-02 01:44:50',0),(86,30,'2023-12-21 20:17:34',0),(87,64,'2024-02-24 11:59:56',0),(88,115,'2024-03-16 17:32:07',1),(89,94,'2024-03-04 16:18:14',0),(91,61,'2023-11-27 11:37:15',1),(92,36,'2024-04-09 17:31:42',0),(93,32,'2023-11-03 01:56:27',1),(95,116,'2024-03-12 02:09:44',0),(96,82,'2024-03-22 10:49:41',0),(97,15,'2023-12-18 20:56:34',0),(98,77,'2024-04-16 07:35:52',0),(99,62,'2024-01-25 21:52:22',1),(100,50,'2024-04-04 15:34:33',0),(101,123,'2024-03-30 04:00:43',1),(102,75,'2024-03-27 09:27:21',1),(103,102,'2024-01-03 07:05:43',1),(105,98,'2023-12-13 14:13:51',1),(106,31,'2024-02-09 19:06:09',1),(107,66,'2024-02-08 17:11:24',1),(108,133,'2023-12-13 00:54:19',1),(109,16,'2024-04-03 13:25:44',1),(110,108,'2024-01-19 06:23:38',0),(111,110,'2023-11-28 15:35:41',1),(112,122,'2024-02-27 06:03:54',0),(113,94,'2024-01-24 11:37:13',1),(114,111,'2023-12-21 00:14:30',0),(115,113,'2024-04-01 22:34:39',0),(116,98,'2024-02-29 10:09:20',0),(117,126,'2024-04-16 17:37:35',1),(119,100,'2023-11-11 00:42:33',0),(120,76,'2024-03-08 09:54:36',1),(121,117,'2023-12-24 06:57:05',1),(122,36,'2023-11-13 07:14:56',1),(123,26,'2024-03-15 01:18:49',0),(125,47,'2024-04-09 11:56:37',1),(126,96,'2024-01-03 20:16:51',0),(128,96,'2023-12-03 14:01:58',0),(130,119,'2023-11-16 11:34:16',1),(131,1,'2024-03-06 15:45:15',1),(132,143,'2023-12-27 00:50:59',0),(133,77,'2024-04-07 06:23:27',1),(134,45,'2023-12-30 09:17:11',0),(135,43,'2024-02-01 11:40:36',1),(136,138,'2024-04-13 14:51:36',1),(137,84,'2023-12-09 23:31:39',0),(139,87,'2024-02-21 16:36:02',0),(140,120,'2024-02-06 14:54:08',1),(141,105,'2024-02-16 02:00:40',0),(142,80,'2024-04-11 23:49:07',1),(143,132,'2023-11-27 20:02:24',1),(144,148,'2023-12-09 21:01:23',0),(145,17,'2024-01-30 22:05:52',0),(146,117,'2024-03-06 08:55:13',0),(147,136,'2023-11-29 20:59:35',1),(148,46,'2024-01-01 16:55:42',0),(149,38,'2023-12-31 15:40:42',0),(151,69,'2024-03-17 22:48:33',1),(152,102,'2024-02-25 06:06:29',1),(153,42,'2023-12-12 07:18:36',0),(154,33,'2023-12-10 02:11:08',0),(155,33,'2023-12-05 07:20:08',0),(156,33,'2024-03-18 17:42:17',0),(157,102,'2024-03-09 15:39:56',0),(158,88,'2023-11-21 05:52:05',0),(159,136,'2024-02-05 06:45:45',1),(161,72,'2024-03-23 21:26:10',0),(162,42,'2023-10-22 06:46:46',0),(163,69,'2024-03-03 07:55:08',1),(164,142,'2024-01-03 23:07:37',1),(165,134,'2024-04-13 10:39:38',1),(166,147,'2023-12-20 19:47:26',0),(167,118,'2023-12-18 14:43:56',0),(168,97,'2024-03-19 15:28:55',0),(169,75,'2024-02-27 16:26:31',0),(170,106,'2024-03-26 06:09:19',1),(171,1,'2024-02-17 13:44:11',0),(172,68,'2024-02-16 06:09:04',1),(173,46,'2024-02-02 21:11:53',1),(174,69,'2024-01-28 13:28:25',1),(175,131,'2024-04-06 08:40:07',1),(176,137,'2024-02-01 06:53:21',0),(177,135,'2023-12-12 05:52:57',0),(178,15,'2023-12-02 22:36:11',1),(179,30,'2024-03-19 21:26:51',0),(180,30,'2024-02-21 12:38:57',1),(181,76,'2024-01-28 07:54:59',0),(183,74,'2024-04-14 07:20:30',1),(185,107,'2024-03-26 00:56:15',1),(186,142,'2024-03-02 14:15:35',0),(187,18,'2024-01-20 05:16:14',1),(188,125,'2024-02-21 01:11:41',1),(189,76,'2024-03-28 05:10:16',0),(190,19,'2024-03-03 07:09:49',0),(191,57,'2024-01-22 15:19:21',1),(192,66,'2024-02-07 18:20:36',1),(193,45,'2024-01-24 05:54:27',1),(196,108,'2024-03-28 04:38:18',1),(197,36,'2024-01-10 07:32:33',1),(198,81,'2024-01-17 19:48:35',0),(199,121,'2024-04-16 15:27:06',1),(200,50,'2024-01-27 09:21:25',0),(201,87,'2023-12-27 23:45:12',1),(202,3,'2024-03-07 16:37:26',1),(203,137,'2024-03-19 05:50:12',0),(204,70,'2024-01-18 20:28:03',1),(205,98,'2024-04-06 08:25:51',1),(206,51,'2023-11-03 05:23:42',0),(207,45,'2024-01-27 06:31:49',1),(208,76,'2024-02-27 04:39:11',0),(209,137,'2023-12-21 13:59:19',0),(210,43,'2024-01-28 01:08:33',1),(211,1,'2024-04-24 09:28:29',1),(212,1,'2024-04-24 09:48:31',1),(213,1,'2024-04-24 10:45:51',1),(214,1,'2024-04-24 19:51:45',1),(215,1,'2024-04-24 19:53:15',1),(216,1,'2024-04-24 21:01:49',1),(217,1,'2024-04-25 08:14:04',1),(218,1,'2024-04-25 08:47:04',1),(219,1,'2024-04-25 09:13:32',1),(220,2,'2024-04-25 10:00:20',1),(221,1,'2024-04-25 10:08:57',1),(222,1,'2024-04-25 10:28:42',1),(223,1,'2024-04-25 10:29:04',1),(224,1,'2024-04-25 10:29:12',1),(225,1,'2024-04-25 11:12:21',1);
/*!40000 ALTER TABLE `tblengajamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblexercicios`
--

DROP TABLE IF EXISTS `tblexercicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblexercicios` (
  `exeId` int NOT NULL AUTO_INCREMENT,
  `exeNome` varchar(100) DEFAULT NULL,
  `exeApaId` int DEFAULT NULL,
  `exeStatus` char(1) DEFAULT NULL,
  `exeIdAcad` int DEFAULT NULL,
  PRIMARY KEY (`exeId`),
  KEY `exeApaId` (`exeApaId`),
  KEY `exeIdAcad` (`exeIdAcad`),
  CONSTRAINT `tblexercicios_ibfk_1` FOREIGN KEY (`exeApaId`) REFERENCES `tblaparelhos` (`apaId`),
  CONSTRAINT `tblexercicios_ibfk_2` FOREIGN KEY (`exeIdAcad`) REFERENCES `tblacademia` (`acaId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblexercicios`
--

LOCK TABLES `tblexercicios` WRITE;
/*!40000 ALTER TABLE `tblexercicios` DISABLE KEYS */;
INSERT INTO `tblexercicios` VALUES (1,'Sei la',4,'1',1),(2,'Sei la 2',4,'0',1),(3,'aaab',3,'0',1);
/*!40000 ALTER TABLE `tblexercicios` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblficha`
--

LOCK TABLES `tblficha` WRITE;
/*!40000 ALTER TABLE `tblficha` DISABLE KEYS */;
INSERT INTO `tblficha` VALUES (1,1,11,1,'00:01:00','0','Aquelas'),(2,2,12,1,'00:05:00','0','Muito Bonito'),(3,3,12,1,'00:03:00','0','Dedo torto'),(4,15,13,1,'00:02:00','0',''),(5,16,13,1,'00:02:00','0',''),(6,129,13,1,'00:02:00','0','Pé ruim'),(7,69,12,1,'00:01:00','0',''),(8,31,12,1,'00:02:00','0',''),(9,137,12,1,'00:01:00','0',''),(10,33,11,1,'00:02:00','0','Pé ruim'),(11,104,12,1,'00:01:00','0',''),(12,74,12,1,'00:02:00','0',''),(13,111,12,1,'00:01:00','0',''),(14,133,152,1,'00:01:00','0',''),(15,77,152,1,'00:01:00','0',''),(16,130,152,1,'00:01:00','0',''),(17,42,152,1,'00:01:00','0',''),(18,134,152,1,'00:01:00','0',''),(19,49,152,1,'00:01:00','0','');
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
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfichadetalhes`
--

LOCK TABLES `tblfichadetalhes` WRITE;
/*!40000 ALTER TABLE `tblfichadetalhes` DISABLE KEYS */;
INSERT INTO `tblfichadetalhes` VALUES (58,'Alongamento','10','10','10',3,'A'),(61,'Alongamento','10','10','10',4,'A'),(70,'Flexão','10','10','10',1,'C'),(73,'Alongamentop','10','10','10',7,'B'),(74,'Remadaaa','10','10','10',7,'C'),(102,'Alongamentooo','10','10','10',7,'A'),(106,'Pu Docks','15','15','15',1,'C'),(112,'Flexão','10','10','10',7,'C'),(119,'Alongamento','15','10','10',7,'A'),(121,'Remadaaa','10','10','10',7,'B'),(125,'Alongamento','10','10','10',1,'A'),(127,'Alongamento','10','10','10',7,'A'),(128,'Remada','20','20','20',7,'B'),(129,'Flexão','10','10','10',7,'C'),(130,'Remada','10','10','10',1,'C'),(131,'Flexão','10','10','10',1,'B'),(132,'Flexão','10','10','10',1,'A'),(135,'Alongamento','10','10','10',1,'C'),(138,'Alongamento','10','10','10',1,'B'),(140,'Remada','10','10','10',1,'B'),(142,'Alongamento','15','10','10',2,'B'),(143,'Alongamento','10','10','10',1,'A'),(144,'Remada','10','10','10',1,'A'),(151,'Remada','15','10','10',2,'A'),(153,'Remada','10','10','10',2,'C'),(154,'Flexão','10','105','10',2,'C'),(155,'Remada','10','10','10',2,'B'),(157,'Flexão','22','24','25',2,'A');
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
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfuncionario`
--

LOCK TABLES `tblfuncionario` WRITE;
/*!40000 ALTER TABLE `tblfuncionario` DISABLE KEYS */;
INSERT INTO `tblfuncionario` VALUES (1,'Binarios','12996138271','12520110','Guaratinguetá','SP','Rua lala',29,'M','577.821.068-00','equipe@gmail.com','2024-04-11 00:00:00','1',NULL,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE',3),(10,'Rodrigo','(12) 99613-8271','12520110','Guaratinguetá','SP','Rua Filadelfo Gandra Martins',10,'M','577.821.068-00','rodrigo@gmail.com','2024-04-14 12:48:21','1',1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE',2),(11,'Heitor','(19) 28301-9283','12570112','Aparecida','SP','Rua Alfredo Penido',10,'M','862.960.070-51','heitor@gmail.com','2024-04-14 00:00:00','1',1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE',1),(12,'Felipeee','(29) 38190-3812','12520110','Guaratinguetá','SP','Rua Filadelfo Gandra Martins',10,'M','859.011.770-70','felipe@gmail.com','2024-04-16 00:00:00','1',1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE',1),(13,'Robert Crona','1-691-781-4108','31424-0913','New Demetrischester','Alaska','Stark Fall',42,'F','62659568712','Constance.Hills@yahoo.com','2023-05-25 23:14:40','1',1,'$argon2id$v=19$m=65536,t=3,p=4$Nb+xwA6oH4/wCOV1i3d9Dg$MKnnZMe+CEn3lt9XGp3LuAk3m+0Hs+pZ1+hUQqRDnuE',1),(152,'Daniell','(81) 23981-0293','12520110','Guaratinguetá','SP','Rua Filadelfo Gandra Martins',10,'M','786.482.450-10','daniel@gmail.com','2024-04-20 00:00:00','1',1,'$argon2id$v=19$m=65536,t=3,p=4$5Sx4P3ZY2HkpdehQfo+A+Q$G49hLJ1VnM5unYtLLS8IgVojp3yLuCZ/CiXiaXqxvEA',1),(153,'Joao Fernandes','(12) 90831-2903','12520100','Guaratinguetá','SP','Rua José Miguel',10,'M','369.506.410-28','joao@gmail.com','2024-04-25 09:02:52','1',3,'$argon2id$v=19$m=65536,t=3,p=4$4RaOYR6nrEjyGRj7pPCg3w$OWNJ43kklzjOLDEgcNhfTriJY6Fh1LamruGTZlcCOy0',2);
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
-- Table structure for table `tblmeta`
--

DROP TABLE IF EXISTS `tblmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblmeta` (
  `metId` int NOT NULL AUTO_INCREMENT,
  `metIdCliente` int DEFAULT NULL,
  `metGordura` double DEFAULT NULL,
  `metPeso` double DEFAULT NULL,
  `metDataCumprir` date DEFAULT NULL,
  `metStatus` char(1) DEFAULT NULL,
  `metStatusAlterar` char(1) DEFAULT NULL,
  `metIdAcad` int DEFAULT NULL,
  PRIMARY KEY (`metId`),
  KEY `metIdCliente` (`metIdCliente`),
  KEY `metIdAcad` (`metIdAcad`),
  CONSTRAINT `tblmeta_ibfk_1` FOREIGN KEY (`metIdCliente`) REFERENCES `tblcliente` (`cliId`),
  CONSTRAINT `tblmeta_ibfk_2` FOREIGN KEY (`metIdAcad`) REFERENCES `tblacademia` (`acaId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmeta`
--

LOCK TABLES `tblmeta` WRITE;
/*!40000 ALTER TABLE `tblmeta` DISABLE KEYS */;
INSERT INTO `tblmeta` VALUES (1,1,4,55,'2026-01-01','1','1',1);
/*!40000 ALTER TABLE `tblmeta` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=648 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsatisfacao`
--

LOCK TABLES `tblsatisfacao` WRITE;
/*!40000 ALTER TABLE `tblsatisfacao` DISABLE KEYS */;
INSERT INTO `tblsatisfacao` VALUES (14,94,1,'2','4','4','1','1',546,'1'),(16,29,1,'4','4','4','4','5',546,'1'),(32,76,1,'1','3','1','2','2',554,'1'),(76,144,1,'3','1','4','2','2',558,'1'),(91,1,1,'5','3','4','2','3',559,'1'),(120,114,1,'2','1','1','3','1',553,'1'),(129,52,1,'5','5','2','5','4',546,'1'),(166,90,1,'2','1','5','2','5',537,'1'),(173,48,1,'3','3','1','2','4',551,'1'),(200,1,1,'1','4','4','5','3',544,'1'),(205,20,1,'3','2','5','3','5',542,'1'),(232,124,1,'1','5','1','3','5',538,'1'),(249,82,1,'3','5','2','2','1',549,'1'),(283,60,1,'2','5','2','3','3',559,'1'),(300,138,1,'3','2','1','5','1',548,'1'),(318,81,1,'5','3','5','5','1',552,'1'),(327,91,1,'2','2','3','1','3',555,'1'),(382,70,1,'2','1','5','4','1',537,'1'),(393,128,1,'2','5','3','1','5',548,'1'),(404,120,1,'1','1','1','1','4',537,'1'),(414,37,1,'3','5','5','1','1',540,'1'),(474,82,1,'2','5','1','1','3',561,'1'),(527,77,1,'1','5','5','1','1',563,'1'),(536,146,1,'5','1','4','1','5',548,'1'),(556,141,1,'3','1','4','2','5',560,'1'),(562,81,1,'5','4','1','5','5',538,'1'),(624,110,1,'1','3','4','5','2',565,'1'),(631,129,1,'1','1','1','1','5',567,'1'),(632,33,1,'5','1','5','5','5',568,'1'),(633,1,1,'1','5','4','3','5',569,'1'),(634,1,1,'5','5','5','5','5',570,'1'),(635,1,1,'4','3','4','4','4',571,'1'),(636,111,1,NULL,NULL,NULL,NULL,NULL,572,'0'),(637,1,1,'5','5','5','5','5',573,'1'),(638,1,1,'5','5','5','5','5',574,'1'),(639,1,1,'5','5','5','5','5',575,'1'),(640,1,1,'5','4','5','5','5',576,'1'),(641,1,1,'1','5','1','1','1',577,'1'),(642,130,1,NULL,NULL,NULL,NULL,NULL,578,'0'),(643,49,1,NULL,NULL,NULL,NULL,NULL,580,'0'),(644,1,1,'3','4','5','4','5',579,'1'),(645,1,1,'5','5','5','4','4',581,'1'),(646,1,1,'5','5','5','5','5',582,'1'),(647,1,1,'4','5','2','3','4',583,'1');
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

-- Dump completed on 2024-04-25 11:15:53
