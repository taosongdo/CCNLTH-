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
-- Table structure for table `job_user`
--

DROP TABLE IF EXISTS `job_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `role` int NOT NULL,
  `gender` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `job_user_email_426ba422_uniq` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_user`
--

LOCK TABLES `job_user` WRITE;
/*!40000 ALTER TABLE `job_user` DISABLE KEYS */;
INSERT INTO `job_user` VALUES (1,'pbkdf2_sha256$870000$wQWUlzqdAEUV8sJLq2mPNc$4XzQtT/gKoZ82B2oXj7eh68cqoOzwl6y8zPC7M6pgiQ=','2025-04-15 02:52:57.391154',1,'Tuan','','','lygiatuan200804@gmail.com',1,1,'2025-03-28 04:49:47.573001','',3,1),(2,'pbkdf2_sha256$870000$GT3hHYWKdJlMwp59ai5pYT$/9/ZFha59Mb0IBO8KzctOglWAWRSR2+xDZEiaEOz0cs=',NULL,0,'TuanEmployer','Tuấn','Lý Gia','lygiatuan200805@gmail.com',0,1,'2025-03-29 03:48:56.207749','https://res.cloudinary.com/dx6brcofe/image/upload/v1736245841/woxspsofipalpoz8r4aj.jpg',2,1),(31,'pbkdf2_sha256$870000$TLzROLGoif53ICFQMLh86Y$2yF/Db8bMzqKTP70nEHJPo+lXzN5+yxOiFh640rQMew=',NULL,0,'TuanApplicant','Tuan','Lý Gia','lygiatuan@ggmail.com',0,1,'2025-03-30 04:35:15.724809','image/upload/v1743309320/debqk7l4daptzxkilzuc.jpg',1,1);
/*!40000 ALTER TABLE `job_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-03 20:07:08
