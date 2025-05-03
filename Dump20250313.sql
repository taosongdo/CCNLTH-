-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: quanlychuyenbay2
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
-- Table structure for table `binhluan`
--

DROP TABLE IF EXISTS `binhluan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `binhluan` (
  `id_binh_luan` int NOT NULL,
  `noi_dung` varchar(255) NOT NULL,
  `thoi_gian` datetime NOT NULL,
  PRIMARY KEY (`id_binh_luan`),
  CONSTRAINT `binhluan_ibfk_1` FOREIGN KEY (`id_binh_luan`) REFERENCES `ve` (`id_ve`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `binhluan`
--

LOCK TABLES `binhluan` WRITE;
/*!40000 ALTER TABLE `binhluan` DISABLE KEYS */;
INSERT INTO `binhluan` VALUES (4,'tốt','2024-12-31 12:31:43'),(5,'go\n','2024-12-31 12:31:51'),(7,'cx ok\n','2024-12-31 12:34:12'),(8,'ok','2024-12-31 15:03:23');
/*!40000 ALTER TABLE `binhluan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chuyenbay`
--

DROP TABLE IF EXISTS `chuyenbay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chuyenbay` (
  `id_chuyen_bay` int NOT NULL AUTO_INCREMENT,
  `id_may_bay` int NOT NULL,
  `id_tuyen_bay` int NOT NULL,
  `id_quy_dinh` int NOT NULL,
  PRIMARY KEY (`id_chuyen_bay`),
  KEY `id_may_bay` (`id_may_bay`),
  KEY `id_tuyen_bay` (`id_tuyen_bay`),
  KEY `id_quy_dinh` (`id_quy_dinh`),
  CONSTRAINT `chuyenbay_ibfk_1` FOREIGN KEY (`id_may_bay`) REFERENCES `maybay` (`id_may_bay`),
  CONSTRAINT `chuyenbay_ibfk_2` FOREIGN KEY (`id_tuyen_bay`) REFERENCES `tuyenbay` (`id_tuyen_bay`),
  CONSTRAINT `chuyenbay_ibfk_3` FOREIGN KEY (`id_quy_dinh`) REFERENCES `quydinh` (`id_quy_dinh`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chuyenbay`
--

LOCK TABLES `chuyenbay` WRITE;
/*!40000 ALTER TABLE `chuyenbay` DISABLE KEYS */;
INSERT INTO `chuyenbay` VALUES (13,1,36,1),(14,1,37,1),(15,1,36,1),(16,1,37,1),(17,1,39,1),(18,1,42,1),(19,1,37,1),(20,1,39,1),(21,1,36,2);
/*!40000 ALTER TABLE `chuyenbay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhuy`
--

DROP TABLE IF EXISTS `donhuy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhuy` (
  `id_don_huy` int NOT NULL AUTO_INCREMENT,
  `id_khach_hang` int NOT NULL,
  `id_chuyen_bay` int NOT NULL,
  `id_nhan_vien` int DEFAULT NULL,
  `id_ghe` int NOT NULL,
  `id_ngan_hang` int DEFAULT NULL,
  `so_tai_khoan` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id_don_huy`),
  UNIQUE KEY `unique_id_chuyen_bay_id_ghe` (`id_chuyen_bay`,`id_ghe`),
  KEY `id_khach_hang` (`id_khach_hang`),
  KEY `id_nhan_vien` (`id_nhan_vien`),
  KEY `id_ghe` (`id_ghe`),
  KEY `id_ngan_hang` (`id_ngan_hang`),
  CONSTRAINT `donhuy_ibfk_1` FOREIGN KEY (`id_khach_hang`) REFERENCES `khachhang` (`id_khach_hang`),
  CONSTRAINT `donhuy_ibfk_2` FOREIGN KEY (`id_chuyen_bay`) REFERENCES `chuyenbay` (`id_chuyen_bay`),
  CONSTRAINT `donhuy_ibfk_3` FOREIGN KEY (`id_nhan_vien`) REFERENCES `nhanvien` (`id_nhan_vien`),
  CONSTRAINT `donhuy_ibfk_4` FOREIGN KEY (`id_ghe`) REFERENCES `ghe` (`id_ghe`),
  CONSTRAINT `donhuy_ibfk_5` FOREIGN KEY (`id_ngan_hang`) REFERENCES `nganhang` (`id_ngan_hang`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhuy`
--

LOCK TABLES `donhuy` WRITE;
/*!40000 ALTER TABLE `donhuy` DISABLE KEYS */;
/*!40000 ALTER TABLE `donhuy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ghe`
--

DROP TABLE IF EXISTS `ghe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ghe` (
  `id_ghe` int NOT NULL AUTO_INCREMENT,
  `id_may_bay` int NOT NULL,
  `hang` int NOT NULL,
  `vi_tri` int NOT NULL,
  PRIMARY KEY (`id_ghe`),
  UNIQUE KEY `unique_id_may_bay_vi_tri_hang` (`id_may_bay`,`vi_tri`,`hang`),
  CONSTRAINT `ghe_ibfk_1` FOREIGN KEY (`id_may_bay`) REFERENCES `maybay` (`id_may_bay`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ghe`
--

LOCK TABLES `ghe` WRITE;
/*!40000 ALTER TABLE `ghe` DISABLE KEYS */;
INSERT INTO `ghe` VALUES (3,1,1,1),(7,1,2,1),(1,1,1,2),(4,1,1,4),(5,1,1,5),(8,1,3,5),(6,1,1,6);
/*!40000 ALTER TABLE `ghe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `id_khach_hang` int NOT NULL,
  PRIMARY KEY (`id_khach_hang`),
  CONSTRAINT `khachhang_ibfk_1` FOREIGN KEY (`id_khach_hang`) REFERENCES `nguoidung` (`id_nguoi_dung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES (67),(74),(76);
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichchuyenbay`
--

DROP TABLE IF EXISTS `lichchuyenbay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lichchuyenbay` (
  `id_chuyen_bay` int NOT NULL,
  `ngay_gio` datetime NOT NULL,
  `thoi_gian_bay` time NOT NULL,
  PRIMARY KEY (`id_chuyen_bay`),
  CONSTRAINT `lichchuyenbay_ibfk_1` FOREIGN KEY (`id_chuyen_bay`) REFERENCES `chuyenbay` (`id_chuyen_bay`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichchuyenbay`
--

LOCK TABLES `lichchuyenbay` WRITE;
/*!40000 ALTER TABLE `lichchuyenbay` DISABLE KEYS */;
INSERT INTO `lichchuyenbay` VALUES (13,'2024-12-12 14:00:10','22:30:00'),(14,'2025-11-11 14:00:01','13:00:00'),(20,'2025-12-12 14:00:10','15:30:00');
/*!40000 ALTER TABLE `lichchuyenbay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maybay`
--

DROP TABLE IF EXISTS `maybay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maybay` (
  `id_may_bay` int NOT NULL AUTO_INCREMENT,
  `ten_may_bay` varchar(20) NOT NULL,
  `hang_may_bay` varchar(20) NOT NULL,
  PRIMARY KEY (`id_may_bay`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maybay`
--

LOCK TABLES `maybay` WRITE;
/*!40000 ALTER TABLE `maybay` DISABLE KEYS */;
INSERT INTO `maybay` VALUES (1,'máy bay mập Tiến','Toyota'),(2,'2 banh','Toyota');
/*!40000 ALTER TABLE `maybay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `muc`
--

DROP TABLE IF EXISTS `muc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `muc` (
  `id_muc` int NOT NULL AUTO_INCREMENT,
  `noi_dung` varchar(40) NOT NULL,
  `href` varchar(40) NOT NULL,
  `user_role` enum('QUAN_TRI','NHAN_VIEN','KHACH_HANG') NOT NULL,
  PRIMARY KEY (`id_muc`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `muc`
--

LOCK TABLES `muc` WRITE;
/*!40000 ALTER TABLE `muc` DISABLE KEYS */;
INSERT INTO `muc` VALUES (1,'đặt vé','/DatVe','KHACH_HANG'),(2,'xem giỏ hàng','/XemGioHang','KHACH_HANG'),(6,'quản lý lịch chuyến bay','/NhanVien/QuanLyLichChuyenBay','NHAN_VIEN'),(7,'quản lý khách hàng','/NhanVien/QuanLyKhachHang','NHAN_VIEN'),(8,'quản lý vé','/NhanVien/QuanLyVe','NHAN_VIEN'),(9,'cập nhật đơn hủy','/NhanVien/XemDSDonHuy','NHAN_VIEN');
/*!40000 ALTER TABLE `muc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nganhang`
--

DROP TABLE IF EXISTS `nganhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nganhang` (
  `id_ngan_hang` int NOT NULL AUTO_INCREMENT,
  `hinh_anh` varchar(40) NOT NULL,
  `ten_ngan_hang` varchar(40) NOT NULL,
  PRIMARY KEY (`id_ngan_hang`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nganhang`
--

LOCK TABLES `nganhang` WRITE;
/*!40000 ALTER TABLE `nganhang` DISABLE KEYS */;
INSERT INTO `nganhang` VALUES (1,'../../static/Images/VIETTINBANK.jpg','VIETTINBANK'),(2,'../../static/Images/MBBANK.png','MBBANK'),(3,'../../static/Images/VIETCOMBANK.jpg','VIETCOMBANK');
/*!40000 ALTER TABLE `nganhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoidung` (
  `id_nguoi_dung` int NOT NULL AUTO_INCREMENT,
  `ten_nguoi_dung` varchar(20) NOT NULL,
  `tai_khoan` varchar(20) NOT NULL,
  `mat_khau` varchar(50) DEFAULT NULL,
  `CCCD` varchar(12) NOT NULL,
  `gmail` varchar(255) NOT NULL,
  `user_role` enum('QUAN_TRI','NHAN_VIEN','KHACH_HANG') DEFAULT NULL,
  `hoat_dong` tinyint(1) DEFAULT NULL,
  `anh_dai_dien` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_nguoi_dung`),
  UNIQUE KEY `tai_khoan` (`tai_khoan`),
  UNIQUE KEY `CCCD` (`CCCD`),
  UNIQUE KEY `gmail` (`gmail`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` VALUES (1,'Tuan_QT','Tuan_QT','2f5e90a01977b597e57d0bb3e909cf00','079204006500','quantri@gmail.com','QUAN_TRI',1,'https://res.cloudinary.com/dx6brcofe/image/upload/v1733042485/nyigfvynduo2zs2swmxv.jpg'),(2,'Tuan_NV_1','Tuan_NV_1','2f5e90a01977b597e57d0bb3e909cf00','079204006501','nhanvien1@gmail.com','NHAN_VIEN',1,'https://res.cloudinary.com/dx6brcofe/image/upload/v1733042485/nyigfvynduo2zs2swmxv.jpg'),(3,'Tuan_NV_2','Tuan_NV_2','2f5e90a01977b597e57d0bb3e909cf00','079204006502','nhanvien2@gmail.com','NHAN_VIEN',1,'https://res.cloudinary.com/dx6brcofe/image/upload/v1733042485/nyigfvynduo2zs2swmxv.jpg'),(67,'Tuan_KH_1','Tuan_KH_1','2f5e90a01977b597e57d0bb3e909cf00','079204000172','lygiatuan200804@gmail.com','KHACH_HANG',1,'https://res.cloudinary.com/dx6brcofe/image/upload/v1735278169/po9td71f7xi8fidat3zk.png'),(74,'Tuan_KH_3','TuanMap33',NULL,'079204000333','khachhang3@gmail.com','KHACH_HANG',0,'https://res.cloudinary.com/dx6brcofe/image/upload/v1733042485/nyigfvynduo2zs2swmxv.jpg'),(76,'Tuan_KH_2','TuanMap',NULL,'079204000202','khachhang2@gmail.com','KHACH_HANG',0,'https://res.cloudinary.com/dx6brcofe/image/upload/v1733042485/nyigfvynduo2zs2swmxv.jpg');
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhanvien` (
  `id_nhan_vien` int NOT NULL,
  PRIMARY KEY (`id_nhan_vien`),
  CONSTRAINT `nhanvien_ibfk_1` FOREIGN KEY (`id_nhan_vien`) REFERENCES `nguoidung` (`id_nguoi_dung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhanvien`
--

LOCK TABLES `nhanvien` WRITE;
/*!40000 ALTER TABLE `nhanvien` DISABLE KEYS */;
INSERT INTO `nhanvien` VALUES (2),(3);
/*!40000 ALTER TABLE `nhanvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quydinh`
--

DROP TABLE IF EXISTS `quydinh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quydinh` (
  `id_quy_dinh` int NOT NULL AUTO_INCREMENT,
  `TG_bay_toi_thieu` time NOT NULL,
  `SL_san_bay_toi_da` int NOT NULL,
  `TG_dung_toi_thieu` time NOT NULL,
  `TG_dung_toi_da` time NOT NULL,
  `TG_mua_truoc` time NOT NULL,
  `TG_dat_truoc` time NOT NULL,
  PRIMARY KEY (`id_quy_dinh`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quydinh`
--

LOCK TABLES `quydinh` WRITE;
/*!40000 ALTER TABLE `quydinh` DISABLE KEYS */;
INSERT INTO `quydinh` VALUES (1,'13:00:00',2,'02:00:00','03:00:00','06:00:00','12:00:00'),(2,'13:00:00',5,'02:00:00','02:00:00','12:00:00','06:00:00');
/*!40000 ALTER TABLE `quydinh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quydinhhangve`
--

DROP TABLE IF EXISTS `quydinhhangve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quydinhhangve` (
  `id_quy_dinh_hang_ve` int NOT NULL AUTO_INCREMENT,
  `id_quy_dinh` int NOT NULL,
  `hang` int NOT NULL,
  `don_gia` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id_quy_dinh_hang_ve`),
  KEY `id_quy_dinh` (`id_quy_dinh`),
  CONSTRAINT `quydinhhangve_ibfk_1` FOREIGN KEY (`id_quy_dinh`) REFERENCES `quydinh` (`id_quy_dinh`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quydinhhangve`
--

LOCK TABLES `quydinhhangve` WRITE;
/*!40000 ALTER TABLE `quydinhhangve` DISABLE KEYS */;
INSERT INTO `quydinhhangve` VALUES (1,1,1,2000000),(2,1,2,2000000),(3,2,1,4000000),(6,1,3,9000000);
/*!40000 ALTER TABLE `quydinhhangve` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanbay`
--

DROP TABLE IF EXISTS `sanbay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanbay` (
  `id_san_bay` int NOT NULL AUTO_INCREMENT,
  `ten_san_bay` varchar(20) NOT NULL,
  PRIMARY KEY (`id_san_bay`),
  UNIQUE KEY `ten_san_bay` (`ten_san_bay`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanbay`
--

LOCK TABLES `sanbay` WRITE;
/*!40000 ALTER TABLE `sanbay` DISABLE KEYS */;
INSERT INTO `sanbay` VALUES (64,'Gia Lai'),(60,'Hà Nội'),(59,'Hải Phòng'),(62,'Huế'),(65,'Long An'),(63,'Mỹ'),(66,'Nga'),(67,'Nghệ An'),(57,'TPHCM'),(68,'Vũng Tàu');
/*!40000 ALTER TABLE `sanbay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanbay_tuyenbay`
--

DROP TABLE IF EXISTS `sanbay_tuyenbay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanbay_tuyenbay` (
  `id_san_bay_tuyen_bay` int NOT NULL AUTO_INCREMENT,
  `id_san_bay` int NOT NULL,
  `id_tuyen_bay` int NOT NULL,
  PRIMARY KEY (`id_san_bay_tuyen_bay`),
  UNIQUE KEY `unique_sb_tb` (`id_san_bay`,`id_tuyen_bay`),
  KEY `id_tuyen_bay` (`id_tuyen_bay`),
  CONSTRAINT `sanbay_tuyenbay_ibfk_1` FOREIGN KEY (`id_san_bay`) REFERENCES `sanbay` (`id_san_bay`),
  CONSTRAINT `sanbay_tuyenbay_ibfk_2` FOREIGN KEY (`id_tuyen_bay`) REFERENCES `tuyenbay` (`id_tuyen_bay`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanbay_tuyenbay`
--

LOCK TABLES `sanbay_tuyenbay` WRITE;
/*!40000 ALTER TABLE `sanbay_tuyenbay` DISABLE KEYS */;
INSERT INTO `sanbay_tuyenbay` VALUES (76,57,36),(71,57,37),(77,57,38),(79,57,39),(92,57,45),(72,59,37),(81,59,40),(88,59,43),(89,59,44),(73,60,36),(82,60,40),(83,60,41),(84,63,41),(86,63,42),(87,63,43),(90,63,44),(80,64,39),(85,65,42),(91,67,45),(78,68,38);
/*!40000 ALTER TABLE `sanbay_tuyenbay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanbaytrunggian`
--

DROP TABLE IF EXISTS `sanbaytrunggian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanbaytrunggian` (
  `id_san_bay_trung_gian` int NOT NULL AUTO_INCREMENT,
  `id_san_bay` int NOT NULL,
  `id_lich_chuyen_bay` int NOT NULL,
  `thoi_gian_dung` time DEFAULT NULL,
  `ghi_chu` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_san_bay_trung_gian`),
  UNIQUE KEY `unique_id_san_bay_id_lich_chuyen_bay` (`id_san_bay`,`id_lich_chuyen_bay`),
  KEY `id_lich_chuyen_bay` (`id_lich_chuyen_bay`),
  CONSTRAINT `sanbaytrunggian_ibfk_1` FOREIGN KEY (`id_san_bay`) REFERENCES `sanbay` (`id_san_bay`),
  CONSTRAINT `sanbaytrunggian_ibfk_2` FOREIGN KEY (`id_lich_chuyen_bay`) REFERENCES `lichchuyenbay` (`id_chuyen_bay`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanbaytrunggian`
--

LOCK TABLES `sanbaytrunggian` WRITE;
/*!40000 ALTER TABLE `sanbaytrunggian` DISABLE KEYS */;
INSERT INTO `sanbaytrunggian` VALUES (129,60,13,'02:30:00','sdfdf'),(130,60,20,'02:30:00',''),(131,59,20,'02:30:00','');
/*!40000 ALTER TABLE `sanbaytrunggian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sodienthoai`
--

DROP TABLE IF EXISTS `sodienthoai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sodienthoai` (
  `id_so_dien_thoai` int NOT NULL AUTO_INCREMENT,
  `id_nguoi_dung` int NOT NULL,
  `so_dien_thoai` varchar(10) NOT NULL,
  PRIMARY KEY (`id_so_dien_thoai`),
  UNIQUE KEY `so_dien_thoai` (`so_dien_thoai`),
  KEY `id_nguoi_dung` (`id_nguoi_dung`),
  CONSTRAINT `sodienthoai_ibfk_1` FOREIGN KEY (`id_nguoi_dung`) REFERENCES `nguoidung` (`id_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sodienthoai`
--

LOCK TABLES `sodienthoai` WRITE;
/*!40000 ALTER TABLE `sodienthoai` DISABLE KEYS */;
INSERT INTO `sodienthoai` VALUES (90,74,'0704533234'),(91,74,'3334533234'),(94,76,'0704532222'),(97,2,'0704530777'),(98,2,'0704530778'),(121,67,'0704532082'),(122,67,'1111111111'),(123,67,'8888888888');
/*!40000 ALTER TABLE `sodienthoai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tuyenbay`
--

DROP TABLE IF EXISTS `tuyenbay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tuyenbay` (
  `id_tuyen_bay` int NOT NULL AUTO_INCREMENT,
  `ten_tuyen_bay` varchar(20) NOT NULL,
  `hinh_anh` varchar(30) NOT NULL,
  PRIMARY KEY (`id_tuyen_bay`),
  UNIQUE KEY `ten_tuyen_bay` (`ten_tuyen_bay`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tuyenbay`
--

LOCK TABLES `tuyenbay` WRITE;
/*!40000 ALTER TABLE `tuyenbay` DISABLE KEYS */;
INSERT INTO `tuyenbay` VALUES (36,'TPHCM - Hà Nội','../static/Images/HaNoi.jpg'),(37,'TPHCM - Hải Phòng','../static/Images/HaiPhong.jpg'),(38,'TPHCM - Vũng Tàu','../static/Images/VungTau.jpg'),(39,'TPHCM - Gia Lai','../static/Images/GiaLai.jpg'),(40,'Hà Nội - Hải Phòng','../static/Images/HaiPhong.jpg'),(41,'Hà Nội - Mỹ','../static/Images/My.jpg'),(42,'Long An - Mỹ','../static/Images/My.jpg'),(43,'Hải Phòng - Mỹ','../static/Images/My.jpg'),(44,'Mỹ - Hải Phòng','../static/Images/HaiPhong.jpg'),(45,'TPHCM - Nghệ An','../static/Images/NgheAn.jpg');
/*!40000 ALTER TABLE `tuyenbay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ve`
--

DROP TABLE IF EXISTS `ve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ve` (
  `id_ve` int NOT NULL AUTO_INCREMENT,
  `id_khach_hang` int NOT NULL,
  `id_chuyen_bay` int NOT NULL,
  `id_nhan_vien` int DEFAULT NULL,
  `id_ghe` int NOT NULL,
  `hinh_thuc_thanh_toan` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_ve`),
  UNIQUE KEY `unique_id_chuyen_bay_id_ghe` (`id_chuyen_bay`,`id_ghe`),
  KEY `id_khach_hang` (`id_khach_hang`),
  KEY `id_nhan_vien` (`id_nhan_vien`),
  KEY `id_ghe` (`id_ghe`),
  CONSTRAINT `ve_ibfk_1` FOREIGN KEY (`id_khach_hang`) REFERENCES `khachhang` (`id_khach_hang`),
  CONSTRAINT `ve_ibfk_2` FOREIGN KEY (`id_chuyen_bay`) REFERENCES `chuyenbay` (`id_chuyen_bay`),
  CONSTRAINT `ve_ibfk_3` FOREIGN KEY (`id_nhan_vien`) REFERENCES `nhanvien` (`id_nhan_vien`),
  CONSTRAINT `ve_ibfk_4` FOREIGN KEY (`id_ghe`) REFERENCES `ghe` (`id_ghe`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ve`
--

LOCK TABLES `ve` WRITE;
/*!40000 ALTER TABLE `ve` DISABLE KEYS */;
INSERT INTO `ve` VALUES (4,67,13,NULL,1,1),(5,67,13,NULL,3,1),(6,67,13,NULL,4,1),(7,67,13,NULL,7,1),(8,67,13,NULL,8,1),(9,67,14,NULL,1,1),(10,67,14,NULL,4,1),(11,67,14,NULL,8,1);
/*!40000 ALTER TABLE `ve` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-13 20:08:17
