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
-- Table structure for table `job_cv`
--

DROP TABLE IF EXISTS `job_cv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_cv` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `name` varchar(40) NOT NULL,
  `image` varchar(255) NOT NULL,
  `applicant_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `job_cv_applicant_id_3013b2ff_fk_job_user_id` (`applicant_id`),
  CONSTRAINT `job_cv_applicant_id_3013b2ff_fk_job_user_id` FOREIGN KEY (`applicant_id`) REFERENCES `job_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_cv`
--

LOCK TABLES `job_cv` WRITE;
/*!40000 ALTER TABLE `job_cv` DISABLE KEYS */;
INSERT INTO `job_cv` VALUES (14,1,'2025-04-10 02:18:27.777341','2025-04-15 08:15:03.819572','cv tự tạo gjfjjf','image/upload/v1744251511/k52www6sox9n5noba1qm.pdf',31),(15,1,'2025-04-15 08:12:18.149203','2025-04-15 08:12:18.149237','Document (1).pdf','image/upload/v1744704741/ae67oxkuwma4iniw7sul.pdf',31),(16,1,'2025-04-15 08:14:47.007956','2025-04-15 08:14:47.007979','Goooo','image/upload/v1744704892/fnfkjxn2265h8bjg3iiq.pdf',31);
/*!40000 ALTER TABLE `job_cv` ENABLE KEYS */;
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
