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
-- Table structure for table `job_jobsearchcriteria`
--

DROP TABLE IF EXISTS `job_jobsearchcriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_jobsearchcriteria` (
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `job_type` int NOT NULL,
  `applicant_id` bigint NOT NULL,
  `district_id` bigint NOT NULL,
  `job` varchar(30) NOT NULL,
  PRIMARY KEY (`applicant_id`),
  KEY `job_jobsearchcriteria_district_id_974862a0_fk_job_district_id` (`district_id`),
  CONSTRAINT `job_jobsearchcriteria_applicant_id_4c9d9815_fk_job_user_id` FOREIGN KEY (`applicant_id`) REFERENCES `job_user` (`id`),
  CONSTRAINT `job_jobsearchcriteria_district_id_974862a0_fk_job_district_id` FOREIGN KEY (`district_id`) REFERENCES `job_district` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_jobsearchcriteria`
--

LOCK TABLES `job_jobsearchcriteria` WRITE;
/*!40000 ALTER TABLE `job_jobsearchcriteria` DISABLE KEYS */;
INSERT INTO `job_jobsearchcriteria` VALUES (1,'2025-04-06 04:27:05.220190','2025-04-15 07:45:04.731433',2,31,4,'It');
/*!40000 ALTER TABLE `job_jobsearchcriteria` ENABLE KEYS */;
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
