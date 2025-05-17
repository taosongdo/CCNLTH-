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
-- Table structure for table `job_educationlevel`
--

DROP TABLE IF EXISTS `job_educationlevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_educationlevel` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `school_name` varchar(30) NOT NULL,
  `mature` varchar(30) NOT NULL,
  `description` longtext NOT NULL,
  `applicant_id` bigint NOT NULL,
  `certificate` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `job_applicanteduactionlevel_applicant_id_3d4ea21c_fk_job_user_id` (`applicant_id`),
  CONSTRAINT `job_applicanteduactionlevel_applicant_id_3d4ea21c_fk_job_user_id` FOREIGN KEY (`applicant_id`) REFERENCES `job_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_educationlevel`
--

LOCK TABLES `job_educationlevel` WRITE;
/*!40000 ALTER TABLE `job_educationlevel` DISABLE KEYS */;
INSERT INTO `job_educationlevel` VALUES (5,1,'2025-04-03 07:58:36.326037','2025-04-06 10:36:36.113888','Cc','F','Ggg',31,'Vgg'),(6,1,'2025-04-03 08:02:40.545130','2025-04-03 08:02:40.545192','Zx','Dr','Trtt',31,'Fgg'),(7,1,'2025-04-03 08:04:07.997310','2025-04-03 08:04:07.997374','Zx','Dr','Trtt',31,'Fgg'),(10,1,'2025-04-06 10:22:00.555468','2025-04-06 10:22:00.555498','Fg','Ghu','',31,''),(11,1,'2025-04-06 10:22:04.286700','2025-04-06 10:22:04.286749','Fg','Ghu','',31,'');
/*!40000 ALTER TABLE `job_educationlevel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-03 20:07:07
