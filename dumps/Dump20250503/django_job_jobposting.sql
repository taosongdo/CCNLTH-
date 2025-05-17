-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: django
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `job_jobposting`
--

DROP TABLE IF EXISTS `job_jobposting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_jobposting` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `description` longtext,
  `requirements` longtext NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `job_type` int NOT NULL,
  `quantity` int NOT NULL,
  `employer_id` bigint NOT NULL,
  `job` varchar(30) NOT NULL,
  `district_id` bigint NOT NULL,
  `address` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `job_jobposting_district_id_0f5867db_fk_job_district_id` (`district_id`),
  KEY `job_jobposting_employer_id_2ec634b8_fk_job_user_id` (`employer_id`),
  CONSTRAINT `job_jobposting_district_id_0f5867db_fk_job_district_id` FOREIGN KEY (`district_id`) REFERENCES `job_district` (`id`),
  CONSTRAINT `job_jobposting_employer_id_2ec634b8_fk_job_user_id` FOREIGN KEY (`employer_id`) REFERENCES `job_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_jobposting`
--

LOCK TABLES `job_jobposting` WRITE;
/*!40000 ALTER TABLE `job_jobposting` DISABLE KEYS */;
INSERT INTO `job_jobposting` VALUES (16,1,'2025-04-15 07:44:01.433537','2025-04-15 07:44:01.433608','Goooo','Gooo',1000000.00,3,80,2,'IT',1,'70 Hà Tôn Quyền'),(17,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền'),(18,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền'),(19,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền'),(20,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền'),(21,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền'),(22,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền'),(23,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền'),(24,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền'),(25,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền'),(26,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền'),(27,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền'),(28,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền'),(30,1,'2025-04-16 04:20:16.734557','2025-04-16 04:20:16.734648','Goooo','Gooo',7000000.00,3,70,2,'IT',1,'70 Hà Tôn Quyền');
/*!40000 ALTER TABLE `job_jobposting` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-03 20:07:06
