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
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKplayer` (`idPlayer`),
  KEY `FKresultType` (`idResultType`),
  CONSTRAINT `FKplayer` FOREIGN KEY (`idPlayer`) REFERENCES `players` (`id`),
  CONSTRAINT `FKresultType` FOREIGN KEY (`idResultType`) REFERENCES `resultTypes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (63,3,2,'2022-11-06'),(64,3,2,'2022-11-07'),(65,3,2,'2022-11-08'),(66,3,2,'2022-11-08'),(67,3,3,'2022-11-09'),(68,3,10,'2022-11-10'),(69,3,11,'2022-11-10'),(70,2,11,'2022-11-10'),(71,2,11,'2022-11-10'),(72,3,11,'2022-11-10'),(73,3,11,'2022-11-10'),(74,1,2,'2022-11-09'),(75,2,3,'2022-11-09'),(76,1,3,'2022-11-09'),(77,3,10,'2022-11-10'),(78,2,10,'2022-11-10'),(79,2,10,'2022-11-10'),(80,3,10,'2022-11-10'),(81,4,9,'2022-11-10'),(82,3,9,'2022-11-10'),(83,3,9,'2022-11-10'),(84,2,9,'2022-11-10');
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
) ENGINE=InnoDB AUTO_INCREMENT=339 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamesDetails`
--

LOCK TABLES `gamesDetails` WRITE;
/*!40000 ALTER TABLE `gamesDetails` DISABLE KEYS */;
INSERT INTO `gamesDetails` VALUES (230,47,63,0),(231,31,63,1),(232,28,63,0),(233,4,64,1),(234,19,64,0),(235,29,64,0),(236,3,65,0),(237,52,65,0),(238,51,65,1),(239,46,66,0),(240,3,66,0),(241,37,66,1),(242,20,67,0),(243,48,67,0),(244,7,67,1),(245,47,68,0),(246,43,68,0),(247,33,68,1),(248,1,68,0),(249,36,68,1),(250,15,68,0),(251,19,68,0),(252,12,68,1),(253,33,69,0),(254,10,69,0),(255,12,69,1),(256,39,69,0),(257,25,69,1),(258,3,70,0),(259,20,70,1),(260,9,70,0),(261,23,70,0),(262,30,70,1),(263,44,70,1),(264,34,70,1),(265,50,71,0),(266,52,71,0),(267,22,71,1),(268,51,71,1),(269,30,72,1),(270,25,72,0),(271,6,72,0),(272,27,73,0),(273,28,73,0),(274,9,73,1),(275,16,73,0),(276,39,73,1),(277,29,74,0),(278,8,74,1),(279,46,74,0),(280,12,67,1),(281,23,75,0),(282,47,75,0),(283,34,75,1),(284,48,75,1),(285,1,76,0),(286,21,76,0),(287,11,76,1),(288,48,77,0),(289,14,77,1),(290,2,77,0),(291,17,77,0),(292,3,77,0),(293,52,77,1),(294,42,78,0),(295,3,78,0),(296,34,78,1),(297,36,78,0),(298,17,78,1),(299,18,78,0),(300,1,78,1),(301,5,78,1),(302,51,79,0),(303,49,79,1),(304,15,79,0),(305,33,79,0),(306,30,79,1),(307,25,79,1),(308,31,79,0),(309,40,80,0),(310,16,80,1),(311,20,80,0),(312,5,80,1),(313,33,80,0),(314,38,80,1),(315,38,81,0),(316,39,81,0),(317,28,81,1),(318,21,81,1),(319,49,81,1),(320,30,82,0),(321,23,82,1),(322,43,82,0),(323,41,82,0),(324,20,82,0),(325,22,82,1),(326,18,83,0),(327,31,83,1),(328,28,83,0),(329,52,83,0),(330,50,83,0),(331,24,83,1),(332,7,83,1),(333,32,84,0),(334,19,84,1),(335,20,84,0),(336,26,84,1),(337,38,84,0),(338,9,84,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (2,'test','test@gmail.com','$2b$10$eQJHLMo2r6Cl3yL1No1X1Oyo4j02wIrsRJsB5RuKlDPV8/t5HorkO'),(3,'test1','test1@gmail.com','$2b$10$O3lPVhpKBhk8Qa0PmxD9Ne52iIpvQjVUrLCiYLR2B9pDxwMwZifme'),(4,'test2','test2@gmail.com','$2b$10$bL3MBcjIS64.z67inn2hau65DCQLID8Zb.s6I3WaEPV6id38RCFCm'),(6,'test3','test3@gmail.com','$2b$10$0oNZlSmKNDhr/vDHXnacU.Gx9m1JEZcQsTRcVZt/AsaUFXIu3QBdq'),(8,'ric','test4@gmail.com','$2b$10$vfkN.P6zInK7I/kZN9yF5.AYqniCRhV8TxQk7Xht4..xebaE0Q8vW'),(9,'Jere','jeremias22xt@gmail.com','$2b$10$SWWFtcE23t4sNyI/vNjIkOJc6Z5ma0X000oy6jSZmHpzipEugYNdW'),(10,'mdcaceres','mdcaceres95@gmail.com','$2b$10$E9pdfi2vFrueF6L0ycNlZeER7LCKy1KdOY85.0GdqI1RQmx0yiqOm'),(11,'testRegistro','registro@gmail.com','$2b$10$aWbcizE27/8Z1ozotoIan.IZRp5IM/pcngijZIx.4.cGTKYo7QX/e');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultTypes`
--

LOCK TABLES `resultTypes` WRITE;
/*!40000 ALTER TABLE `resultTypes` DISABLE KEYS */;
INSERT INTO `resultTypes` VALUES (1,'pending'),(2,'win'),(3,'lost'),(4,'draw');
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

-- Dump completed on 2022-11-17  8:17:43
