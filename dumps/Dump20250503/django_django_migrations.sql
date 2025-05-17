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
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-03-28 04:48:59.874576'),(2,'contenttypes','0002_remove_content_type_name','2025-03-28 04:49:00.041619'),(3,'auth','0001_initial','2025-03-28 04:49:00.528527'),(4,'auth','0002_alter_permission_name_max_length','2025-03-28 04:49:00.634347'),(5,'auth','0003_alter_user_email_max_length','2025-03-28 04:49:00.644695'),(6,'auth','0004_alter_user_username_opts','2025-03-28 04:49:00.654877'),(7,'auth','0005_alter_user_last_login_null','2025-03-28 04:49:00.666985'),(8,'auth','0006_require_contenttypes_0002','2025-03-28 04:49:00.672128'),(9,'auth','0007_alter_validators_add_error_messages','2025-03-28 04:49:00.683472'),(10,'auth','0008_alter_user_username_max_length','2025-03-28 04:49:00.691028'),(11,'auth','0009_alter_user_last_name_max_length','2025-03-28 04:49:00.701911'),(12,'auth','0010_alter_group_name_max_length','2025-03-28 04:49:00.725429'),(13,'auth','0011_update_proxy_permissions','2025-03-28 04:49:00.735688'),(14,'auth','0012_alter_user_first_name_max_length','2025-03-28 04:49:00.744457'),(15,'job','0001_initial','2025-03-28 04:49:02.602437'),(16,'admin','0001_initial','2025-03-28 04:49:02.878398'),(17,'admin','0002_logentry_remove_auto_add','2025-03-28 04:49:02.894531'),(18,'admin','0003_logentry_add_action_flag_choices','2025-03-28 04:49:02.917792'),(19,'oauth2_provider','0001_initial','2025-03-28 04:49:04.438166'),(20,'oauth2_provider','0002_auto_20190406_1805','2025-03-28 04:49:04.548509'),(21,'oauth2_provider','0003_auto_20201211_1314','2025-03-28 04:49:04.717732'),(22,'oauth2_provider','0004_auto_20200902_2022','2025-03-28 04:49:05.320797'),(23,'oauth2_provider','0005_auto_20211222_2352','2025-03-28 04:49:05.435822'),(24,'oauth2_provider','0006_alter_application_client_secret','2025-03-28 04:49:05.495250'),(25,'oauth2_provider','0007_application_post_logout_redirect_uris','2025-03-28 04:49:05.561808'),(26,'oauth2_provider','0008_alter_accesstoken_token','2025-03-28 04:49:05.586170'),(27,'oauth2_provider','0009_add_hash_client_secret','2025-03-28 04:49:05.685677'),(28,'oauth2_provider','0010_application_allowed_origins','2025-03-28 04:49:05.758093'),(29,'oauth2_provider','0011_refreshtoken_token_family','2025-03-28 04:49:05.817404'),(30,'oauth2_provider','0012_add_token_checksum','2025-03-28 04:49:06.376949'),(31,'sessions','0001_initial','2025-03-28 04:49:06.462664'),(32,'job','0002_remove_job_descriptions_remove_job_id_admin_and_more','2025-03-28 14:10:34.389824'),(33,'job','0003_user_gender','2025-03-28 14:13:48.590321'),(34,'job','0004_remove_jobposting_name_jobposting_id_city_and_more','2025-03-29 02:55:42.953609'),(35,'job','0005_alter_user_email_alter_user_first_name_and_more','2025-03-29 03:30:13.114412'),(36,'job','0006_alter_jobposting_descriptions_and_more','2025-03-29 04:43:59.714686'),(37,'job','0007_alter_jobposting_quantity','2025-03-29 04:47:45.452852'),(38,'job','0008_alter_jobposting_quantity','2025-03-29 05:02:15.350041'),(39,'job','0009_alter_jobposting_quantity','2025-03-29 05:17:02.430776'),(40,'job','0010_alter_jobposting_quantity','2025-03-29 07:48:05.322617'),(41,'job','0011_remove_jobposting_id_admin_result_id_admin','2025-03-29 13:19:01.927727'),(42,'job','0012_rename_id_cv_apply_cv_rename_id_job_apply_job_and_more','2025-03-29 14:18:25.576203'),(43,'job','0013_rename_id_city_district_city_and_more','2025-03-29 14:18:26.007134'),(44,'job','0014_remove_user_note','2025-03-29 17:53:17.260399'),(45,'job','0015_applicantcertificate_alter_phone_phone_and_more','2025-03-31 05:17:29.084159'),(46,'job','0016_rename_phone_phone_value','2025-03-31 05:17:29.290687'),(47,'job','0017_alter_applicanteduactionlevel_cetificate_and_more','2025-03-31 14:28:47.897270'),(48,'job','0018_rename_applicanteduactionlevel_eduactionlevel_and_more','2025-04-01 04:45:38.822306'),(49,'job','0019_rename_cetificate_eduactionlevel_certificate','2025-04-01 04:49:03.096876'),(50,'job','0020_rename_descriptions_eduactionlevel_description','2025-04-01 04:51:18.469589'),(51,'job','0021_skill_value','2025-04-01 05:31:01.641055'),(52,'job','0022_rename_desciptions_experience_desciption','2025-04-01 05:44:57.763389'),(53,'job','0023_rename_desciption_experience_description','2025-04-01 07:09:12.539249'),(54,'job','0024_remove_jobsearchcriteria_id_and_more','2025-04-01 11:12:16.936796'),(55,'job','0025_alter_jobposting_job_alter_jobsearchcriteria_job_and_more','2025-04-03 02:28:48.484306'),(56,'job','0026_remove_jobposting_city_remove_jobsearchcriteria_city','2025-04-06 03:59:46.267138'),(57,'job','0027_rename_eduactionlevel_educationlevel','2025-04-06 07:58:28.400112'),(58,'job','0028_rename_descriptions_jobposting_description_and_more','2025-04-08 08:58:08.267956'),(59,'job','0029_jobposting_address','2025-04-08 11:54:14.888552'),(60,'job','0030_apply_seen','2025-04-09 02:57:48.072422'),(61,'job','0031_remove_apply_seen_alter_apply_apply_status','2025-04-09 03:07:05.589969'),(62,'job','0032_rename_job_apply_job_posting','2025-04-09 04:47:37.169213'),(63,'job','0033_remove_apply_expired_date','2025-04-09 05:24:03.828195'),(64,'job','0034_rename_id_result_job_posting','2025-04-15 02:42:45.279393'),(65,'job','0035_alter_apply_message','2025-04-15 02:42:45.596843'),(66,'job','0036_alter_apply_message','2025-04-15 02:42:45.640783'),(67,'job','0037_applydateandmessage_remove_apply_interviewing_date_and_more','2025-04-15 02:42:46.248048'),(68,'job','0038_alter_applydateandmessage_interviewing_date','2025-04-15 02:42:46.477702'),(69,'job','0039_alter_applydateandmessage_interviewing_date','2025-04-15 02:42:46.518606'),(70,'job','0040_alter_apply_apply_status_chatgroup','2025-04-17 02:09:10.159691'),(71,'job','0041_alter_chatgroup_unique_together_expopushtoken','2025-04-17 16:33:38.441436');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
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
