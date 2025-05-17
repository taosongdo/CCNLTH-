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
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add city',7,'add_city'),(26,'Can change city',7,'change_city'),(27,'Can delete city',7,'delete_city'),(28,'Can view city',7,'view_city'),(29,'Can add job',8,'add_job'),(30,'Can change job',8,'change_job'),(31,'Can delete job',8,'delete_job'),(32,'Can view job',8,'view_job'),(33,'Can add cv',9,'add_cv'),(34,'Can change cv',9,'change_cv'),(35,'Can delete cv',9,'delete_cv'),(36,'Can view cv',9,'view_cv'),(37,'Can add district',10,'add_district'),(38,'Can change district',10,'change_district'),(39,'Can delete district',10,'delete_district'),(40,'Can view district',10,'view_district'),(41,'Can add result',11,'add_result'),(42,'Can change result',11,'change_result'),(43,'Can delete result',11,'delete_result'),(44,'Can view result',11,'view_result'),(45,'Can add apply',12,'add_apply'),(46,'Can change apply',12,'change_apply'),(47,'Can delete apply',12,'delete_apply'),(48,'Can view apply',12,'view_apply'),(49,'Can add phone',13,'add_phone'),(50,'Can change phone',13,'change_phone'),(51,'Can delete phone',13,'delete_phone'),(52,'Can view phone',13,'view_phone'),(53,'Can add user information',14,'add_userinformation'),(54,'Can change user information',14,'change_userinformation'),(55,'Can delete user information',14,'delete_userinformation'),(56,'Can view user information',14,'view_userinformation'),(57,'Can add application',15,'add_application'),(58,'Can change application',15,'change_application'),(59,'Can delete application',15,'delete_application'),(60,'Can view application',15,'view_application'),(61,'Can add access token',16,'add_accesstoken'),(62,'Can change access token',16,'change_accesstoken'),(63,'Can delete access token',16,'delete_accesstoken'),(64,'Can view access token',16,'view_accesstoken'),(65,'Can add grant',17,'add_grant'),(66,'Can change grant',17,'change_grant'),(67,'Can delete grant',17,'delete_grant'),(68,'Can view grant',17,'view_grant'),(69,'Can add refresh token',18,'add_refreshtoken'),(70,'Can change refresh token',18,'change_refreshtoken'),(71,'Can delete refresh token',18,'delete_refreshtoken'),(72,'Can view refresh token',18,'view_refreshtoken'),(73,'Can add id token',19,'add_idtoken'),(74,'Can change id token',19,'change_idtoken'),(75,'Can delete id token',19,'delete_idtoken'),(76,'Can view id token',19,'view_idtoken'),(77,'Can add job posting',20,'add_jobposting'),(78,'Can change job posting',20,'change_jobposting'),(79,'Can delete job posting',20,'delete_jobposting'),(80,'Can view job posting',20,'view_jobposting'),(81,'Can add applicant certificate',21,'add_applicantcertificate'),(82,'Can change applicant certificate',21,'change_applicantcertificate'),(83,'Can delete applicant certificate',21,'delete_applicantcertificate'),(84,'Can view applicant certificate',21,'view_applicantcertificate'),(85,'Can add applicant eduaction level',22,'add_applicanteduactionlevel'),(86,'Can change applicant eduaction level',22,'change_applicanteduactionlevel'),(87,'Can delete applicant eduaction level',22,'delete_applicanteduactionlevel'),(88,'Can view applicant eduaction level',22,'view_applicanteduactionlevel'),(89,'Can add applicant experience',23,'add_applicantexperience'),(90,'Can change applicant experience',23,'change_applicantexperience'),(91,'Can delete applicant experience',23,'delete_applicantexperience'),(92,'Can view applicant experience',23,'view_applicantexperience'),(93,'Can add applicant skill',24,'add_applicantskill'),(94,'Can change applicant skill',24,'change_applicantskill'),(95,'Can delete applicant skill',24,'delete_applicantskill'),(96,'Can view applicant skill',24,'view_applicantskill'),(97,'Can add job search criteria',25,'add_jobsearchcriteria'),(98,'Can change job search criteria',25,'change_jobsearchcriteria'),(99,'Can delete job search criteria',25,'delete_jobsearchcriteria'),(100,'Can view job search criteria',25,'view_jobsearchcriteria'),(101,'Can add eduaction level',22,'add_eduactionlevel'),(102,'Can change eduaction level',22,'change_eduactionlevel'),(103,'Can delete eduaction level',22,'delete_eduactionlevel'),(104,'Can view eduaction level',22,'view_eduactionlevel'),(105,'Can add experience',23,'add_experience'),(106,'Can change experience',23,'change_experience'),(107,'Can delete experience',23,'delete_experience'),(108,'Can view experience',23,'view_experience'),(109,'Can add skill',24,'add_skill'),(110,'Can change skill',24,'change_skill'),(111,'Can delete skill',24,'delete_skill'),(112,'Can view skill',24,'view_skill'),(113,'Can add education level',22,'add_educationlevel'),(114,'Can change education level',22,'change_educationlevel'),(115,'Can delete education level',22,'delete_educationlevel'),(116,'Can view education level',22,'view_educationlevel'),(117,'Can add apply date and message',26,'add_applydateandmessage'),(118,'Can change apply date and message',26,'change_applydateandmessage'),(119,'Can delete apply date and message',26,'delete_applydateandmessage'),(120,'Can view apply date and message',26,'view_applydateandmessage'),(121,'Can add chat group',27,'add_chatgroup'),(122,'Can change chat group',27,'change_chatgroup'),(123,'Can delete chat group',27,'delete_chatgroup'),(124,'Can view chat group',27,'view_chatgroup'),(125,'Can add expo push token',28,'add_expopushtoken'),(126,'Can change expo push token',28,'change_expopushtoken'),(127,'Can delete expo push token',28,'delete_expopushtoken'),(128,'Can view expo push token',28,'view_expopushtoken');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-03 20:07:04
