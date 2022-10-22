-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: containers-us-west-93.railway.app    Database: railway
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(5) NOT NULL DEFAULT '0',
  `idSuiteType` int NOT NULL,
  `path` text,
  PRIMARY KEY (`id`),
  KEY `FKsuiteType` (`idSuiteType`),
  CONSTRAINT `FKsuiteType` FOREIGN KEY (`idSuiteType`) REFERENCES `suiteTypes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` VALUES (1,'A',1,NULL),(2,'2',1,NULL),(3,'3',1,NULL),(4,'4',1,NULL),(5,'5',1,NULL),(6,'6',1,NULL),(7,'7',1,NULL),(8,'8',1,NULL),(9,'9',1,NULL),(10,'10',1,NULL),(11,'J',1,NULL),(12,'Q',1,NULL),(13,'K',1,NULL),(14,'A',2,NULL),(15,'2',2,NULL),(16,'3',2,NULL),(17,'4',2,NULL),(18,'5',2,NULL),(19,'6',2,NULL),(20,'7',2,NULL),(21,'8',2,NULL),(22,'9',2,NULL),(23,'10',2,NULL),(24,'J',2,NULL),(25,'Q',2,NULL),(26,'K',2,NULL),(27,'A',3,NULL),(28,'2',3,NULL),(29,'3',3,NULL),(30,'4',3,NULL),(31,'5',3,NULL),(32,'6',3,NULL),(33,'7',3,NULL),(34,'8',3,NULL),(35,'9',3,NULL),(36,'10',3,NULL),(37,'J',3,NULL),(38,'Q',3,NULL),(39,'K',3,NULL),(40,'A',4,NULL),(41,'2',4,NULL),(42,'3',4,NULL),(43,'4',4,NULL),(44,'5',4,NULL),(45,'6',4,NULL),(46,'7',4,NULL),(47,'8',4,NULL),(48,'9',4,NULL),(49,'10',4,NULL),(50,'J',4,NULL),(51,'Q',4,NULL),(52,'K',4,NULL);
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idResultType` int NOT NULL,
  `idPlayer` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKresultType` (`idResultType`),
  KEY `FKplayer` (`idPlayer`),
  CONSTRAINT `FKplayer` FOREIGN KEY (`idPlayer`) REFERENCES `players` (`id`),
  CONSTRAINT `FKresultType` FOREIGN KEY (`idResultType`) REFERENCES `resultTypes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gamesDetails`
--

DROP TABLE IF EXISTS `gamesDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gamesDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idCard` int NOT NULL,
  `idGame` int NOT NULL,
  `isCroupier` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FKcard` (`idCard`),
  KEY `FKgame` (`idGame`),
  CONSTRAINT `FKcard` FOREIGN KEY (`idCard`) REFERENCES `cards` (`id`),
  CONSTRAINT `FKgame` FOREIGN KEY (`idGame`) REFERENCES `games` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamesDetails`
--

LOCK TABLES `gamesDetails` WRITE;
/*!40000 ALTER TABLE `gamesDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `gamesDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (2,'test','test@gmail.com','$2b$10$eQJHLMo2r6Cl3yL1No1X1Oyo4j02wIrsRJsB5RuKlDPV8/t5HorkO'),(3,'test1','test1@gmail.com','$2b$10$O3lPVhpKBhk8Qa0PmxD9Ne52iIpvQjVUrLCiYLR2B9pDxwMwZifme'),(4,'test2','test2@gmail.com','$2b$10$bL3MBcjIS64.z67inn2hau65DCQLID8Zb.s6I3WaEPV6id38RCFCm');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultTypes`
--

DROP TABLE IF EXISTS `resultTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultTypes`
--

LOCK TABLES `resultTypes` WRITE;
/*!40000 ALTER TABLE `resultTypes` DISABLE KEYS */;
/*!40000 ALTER TABLE `resultTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suiteTypes`
--

DROP TABLE IF EXISTS `suiteTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suiteTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suiteTypes`
--

LOCK TABLES `suiteTypes` WRITE;
/*!40000 ALTER TABLE `suiteTypes` DISABLE KEYS */;
INSERT INTO `suiteTypes` VALUES (1,'S'),(2,'H'),(3,'D'),(4,'C');
/*!40000 ALTER TABLE `suiteTypes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-22  2:16:00
