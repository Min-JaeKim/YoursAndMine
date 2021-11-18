-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: yam-db.ccvrsozs6waf.ap-northeast-2.rds.amazonaws.com    Database: yam
-- ------------------------------------------------------
-- Server version	8.0.23

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `authority`
--

DROP TABLE IF EXISTS `authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authority` (
  `authority_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`authority_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authority`
--

LOCK TABLES `authority` WRITE;
/*!40000 ALTER TABLE `authority` DISABLE KEYS */;
INSERT INTO `authority` VALUES ('ROLE_ADMIN\nROLE_ADMIN\nROLE_ADMIN'),('ROLE_USER');
/*!40000 ALTER TABLE `authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `item_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`item_id`,`user_id`),
  KEY `FK_user_TO_bookmark_1_idx` (`user_id`),
  CONSTRAINT `FK_item_TO_bookmark_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`),
  CONSTRAINT `FK_user_TO_bookmark_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
INSERT INTO `bookmark` VALUES (152,26),(170,31),(171,31),(62,33);
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deal`
--

DROP TABLE IF EXISTS `deal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deal` (
  `deal_id` int NOT NULL AUTO_INCREMENT,
  `deal_start_date` date NOT NULL,
  `deal_end_date` date NOT NULL,
  `deal_total_price` int NOT NULL,
  `deal_status` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `buyer_id` int NOT NULL,
  `seller_id` int NOT NULL,
  `item_id` int NOT NULL,
  PRIMARY KEY (`deal_id`),
  KEY `FK_item_TO_deal_1_idx` (`item_id`),
  KEY `FK_user_TO_deal_2_idx` (`seller_id`),
  KEY `FK_user_TO_deal_1_idx` (`buyer_id`),
  CONSTRAINT `FK_item_TO_deal_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`),
  CONSTRAINT `FK_user_TO_deal_1` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_user_TO_deal_2` FOREIGN KEY (`seller_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deal`
--

LOCK TABLES `deal` WRITE;
/*!40000 ALTER TABLE `deal` DISABLE KEYS */;
INSERT INTO `deal` VALUES (29,'2021-10-22','2021-10-26',75000,'예약완료',33,28,130),(30,'2021-10-29','2021-10-30',30000,'예약완료',33,28,130),(31,'2021-11-21','2021-11-26',6000,'예약완료',33,28,74),(32,'2021-12-07','2021-12-17',165000,'예약완료',33,28,130),(33,'2021-11-22','2021-11-26',5000,'예약완료',34,29,174),(34,'2021-11-28','2021-11-29',400000,'예약완료',34,29,173),(35,'2021-10-24','2021-10-26',9000,'예약완료',29,30,169),(36,'2021-10-23','2021-10-25',24000,'예약완료',29,26,175),(37,'2021-10-22','2021-10-26',500000,'예약완료',30,29,168),(38,'2021-11-18','2021-11-20',45000,'예약완료',33,28,130),(39,'2021-12-26','2021-12-27',30000,'예약완료',33,28,130);
/*!40000 ALTER TABLE `deal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `item_id` int NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `FK_user_TO_image_1_idx` (`item_id`),
  CONSTRAINT `FK_item_TO_image_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (38,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/output_468790695.jpg%282021-11-18%29%20-%20output_468790695.jpg',59),(39,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/3562239_represent.jpg%282021-11-18%29%20-%203562239_represent.jpg',60),(40,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EA%B0%95%EC%95%84%EC%A7%80%EC%9B%90%ED%86%B5%EA%B0%80%EB%B0%A9.PNG%282021-11-18%29%20-%20%EA%B0%95%EC%95%84%EC%A7%80%EC%9B%90%ED%86%B5%EA%B0%80%EB%B0%A9.PNG',61),(41,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/1589616861200.jpg%282021-11-18%29%20-%201589616861200.jpg',62),(42,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/21632A42524961001A.jpg%282021-11-18%29%20-%2021632A42524961001A.jpg',65),(43,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/D37UWPF4MWLHFZ2ZN3Z2CDN7FA.jpg%282021-11-18%29%20-%20D37UWPF4MWLHFZ2ZN3Z2CDN7FA.jpg',69),(44,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/59ea14a62c04d7098defb7dfc19cda6f.jpg%282021-11-18%29%20-%2059ea14a62c04d7098defb7dfc19cda6f.jpg',71),(45,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/0040020000122.jpg%282021-11-18%29%20-%200040020000122.jpg',72),(46,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/IMG_1834.jpg%282021-11-18%29%20-%20IMG_1834.jpg',74),(47,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/mblogthumb-phinf.pstatic.jpg%282021-11-18%29%20-%20mblogthumb-phinf.pstatic.jpg',76),(48,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/1369655_431887_5647.jpg%282021-11-18%29%20-%201369655_431887_5647.jpg',78),(49,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/iu5_21.jpg%282021-11-18%29%20-%20iu5_21.jpg',80),(51,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%ED%8A%B8%EB%9F%BC%ED%8E%AB.PNG%282021-11-18%29%20-%20%ED%8A%B8%EB%9F%BC%ED%8E%AB.PNG',95),(52,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%9D%B4%EC%A0%A4.PNG%282021-11-18%29%20-%20%EC%9D%B4%EC%A0%A4.PNG',96),(53,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%82%B0%ED%83%80%ED%81%B4%EB%A1%9C%EC%8A%A4%EB%B3%B5%EC%9E%A5.PNG%282021-11-18%29%20-%20%EC%82%B0%ED%83%80%ED%81%B4%EB%A1%9C%EC%8A%A4%EB%B3%B5%EC%9E%A5.PNG',98),(57,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EB%A1%A4%EB%A0%89%EC%8A%A4%EC%8B%9C%EA%B3%84.PNG%282021-11-18%29%20-%20%EB%A1%A4%EB%A0%89%EC%8A%A4%EC%8B%9C%EA%B3%84.PNG',108),(58,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/asd.jpg%282021-11-18%29%20-%20asd.jpg',109),(60,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/podaegi.jpg%282021-11-18%29%20-%20podaegi.jpg',112),(61,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/45f367c26306f8a5df46ee8d2063db15.jpg%282021-11-18%29%20-%2045f367c26306f8a5df46ee8d2063db15.jpg',113),(62,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%BA%A0%ED%95%91%EC%BD%94%ED%8E%A0%EC%84%B8%ED%8A%B8.jpg%282021-11-18%29%20-%20%EC%BA%A0%ED%95%91%EC%BD%94%ED%8E%A0%EC%84%B8%ED%8A%B8.jpg',114),(63,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/greedle.jpg%282021-11-18%29%20-%20greedle.jpg',119),(64,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/cp.jpg%282021-11-18%29%20-%20cp.jpg',120),(65,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EB%A1%B1%EB%85%B8%EC%A6%88.PNG%282021-11-18%29%20-%20%EB%A1%B1%EB%85%B8%EC%A6%88.PNG',121),(66,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/20210615115216_fcf58213495a82274d4da76ff38d73f7_0jkx.jpg%282021-11-18%29%20-%2020210615115216_fcf58213495a82274d4da76ff38d73f7_0jkx.jpg',122),(67,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/evpost_Xiaomi-PRO-elektric%CC%8Cni-skiro.jpg%282021-11-18%29%20-%20evpost_Xiaomi-PRO-elektric%CC%8Cni-skiro.jpg',130),(68,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%BA%A0%ED%95%91%ED%85%8C%EC%9D%B4%EB%B8%94.jpg%282021-11-18%29%20-%20%EC%BA%A0%ED%95%91%ED%85%8C%EC%9D%B4%EB%B8%94.jpg',141),(69,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EB%8B%A4%EC%9D%B4%EC%8A%A8v15%EC%B2%AD%EC%86%8C%EA%B8%B0.PNG%282021-11-18%29%20-%20%EB%8B%A4%EC%9D%B4%EC%8A%A8v15%EC%B2%AD%EC%86%8C%EA%B8%B0.PNG',142),(70,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/cz.jpg%282021-11-18%29%20-%20cz.jpg',143),(71,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%BA%A0%ED%95%91%ED%95%B4%EB%A8%B9.jpg%282021-11-18%29%20-%20%EC%BA%A0%ED%95%91%ED%95%B4%EB%A8%B9.jpg',149),(72,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EB%8B%A4%EC%9D%B4%EC%8A%A8%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B4%ED%8A%B8%EB%84%88.PNG%282021-11-18%29%20-%20%EB%8B%A4%EC%9D%B4%EC%8A%A8%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B4%ED%8A%B8%EB%84%88.PNG',150),(73,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%BA%A0%ED%95%91%EC%9A%A9%EC%82%BD%EC%B9%BC%EB%8F%84%EB%81%BC.PNG%282021-11-18%29%20-%20%EC%BA%A0%ED%95%91%EC%9A%A9%EC%82%BD%EC%B9%BC%EB%8F%84%EB%81%BC.PNG',151),(74,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%BA%A0%ED%95%91%EC%B9%B4.PNG%282021-11-18%29%20-%20%EC%BA%A0%ED%95%91%EC%B9%B4.PNG',152),(75,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EA%B8%88%EA%B7%B8%EB%A6%87.PNG%282021-11-18%29%20-%20%EA%B8%88%EA%B7%B8%EB%A6%87.PNG',153),(76,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%ED%86%A0%EB%B9%84%EC%9D%98%EC%8A%A4%ED%94%84%EB%A7%81.PNG%282021-11-18%29%20-%20%ED%86%A0%EB%B9%84%EC%9D%98%EC%8A%A4%ED%94%84%EB%A7%81.PNG',154),(77,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/ccccc.jpg%282021-11-18%29%20-%20ccccc.jpg',155),(78,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%ED%86%A0%EC%8A%A4%ED%8A%B8%EA%B8%B0.PNG%282021-11-18%29%20-%20%ED%86%A0%EC%8A%A4%ED%8A%B8%EA%B8%B0.PNG',156),(79,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EB%8B%A4%EC%9D%B4%EC%8A%A8%EC%97%90%EC%96%B4%EB%9E%A9%EC%8A%A4%ED%83%80%EC%9D%BC%EB%9F%AC%EC%BB%B4%ED%94%8C%EB%A6%AC%ED%8A%B8.JPG%282021-11-18%29%20-%20%EB%8B%A4%EC%9D%B4%EC%8A%A8%EC%97%90%EC%96%B4%EB%9E%A9%EC%8A%A4%ED%83%80%EC%9D%BC%EB%9F%AC%EC%BB%B4%ED%94%8C%EB%A6%AC%ED%8A%B8.JPG',157),(80,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EA%B7%B8%EB%A6%B4.PNG%282021-11-18%29%20-%20%EA%B7%B8%EB%A6%B4.PNG',158),(81,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/gggg.jpg%282021-11-18%29%20-%20gggg.jpg',159),(82,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%A1%B0%EB%AA%85.jpg%282021-11-18%29%20-%20%EC%A1%B0%EB%AA%85.jpg',160),(83,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/aa.jpg%282021-11-18%29%20-%20aa.jpg',161),(84,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%8B%9D%EA%B8%B0.jpg%282021-11-18%29%20-%20%EC%8B%9D%EA%B8%B0.jpg',162),(85,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%ED%9B%84%EC%A7%80%ED%95%84%EB%A6%84%EC%9D%B8%EC%8A%A4%ED%83%81%EC%8A%A4%EB%AF%B8.PNG%282021-11-18%29%20-%20%ED%9B%84%EC%A7%80%ED%95%84%EB%A6%84%EC%9D%B8%EC%8A%A4%ED%83%81%EC%8A%A4%EB%AF%B8.PNG',163),(86,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/tt.jpg.jpg%282021-11-18%29%20-%20tt.jpg.jpg',164),(87,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%8A%A4%ED%83%A0%EB%94%A9%EB%AA%A8%EB%8B%88%ED%84%B0.JPG%282021-11-18%29%20-%20%EC%8A%A4%ED%83%A0%EB%94%A9%EB%AA%A8%EB%8B%88%ED%84%B0.JPG',165),(88,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EB%8B%A4%EC%9D%B4%EC%8A%A8%EA%B0%80%EC%8A%B5%EA%B3%B5%EA%B8%B0.PNG%282021-11-18%29%20-%20%EB%8B%A4%EC%9D%B4%EC%8A%A8%EA%B0%80%EC%8A%B5%EA%B3%B5%EA%B8%B0.PNG',166),(89,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/dd.jpg.jpg%282021-11-18%29%20-%20dd.jpg.jpg',167),(90,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EB%8B%A4%EC%9D%B4%EC%8A%A8%EB%9D%BC%EC%9D%B4%ED%8A%B8.PNG%282021-11-18%29%20-%20%EB%8B%A4%EC%9D%B4%EC%8A%A8%EB%9D%BC%EC%9D%B4%ED%8A%B8.PNG',168),(91,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/kk.jpg%282021-11-18%29%20-%20kk.jpg',169),(92,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/nnn.jpg%282021-11-18%29%20-%20nnn.jpg',170),(93,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EB%8B%8C%ED%85%90%EB%8F%84%20%EC%8A%A4%EC%9C%84%EC%B9%98.jpg%282021-11-18%29%20-%20%EB%8B%8C%ED%85%90%EB%8F%84%20%EC%8A%A4%EC%9C%84%EC%B9%98.jpg',171),(95,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%9C%A0%EB%AA%A8%EC%B0%A8%EC%9C%A0.PNG%282021-11-18%29%20-%20%EC%9C%A0%EB%AA%A8%EC%B0%A8%EC%9C%A0.PNG',173),(96,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%A0%9C%EB%A6%AC.jpg%282021-11-18%29%20-%20%EC%A0%9C%EB%A6%AC.jpg',174),(97,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/t%EC%8B%A4%EB%82%B4%EC%8B%9D%EB%AC%BC.jpg%282021-11-18%29%20-%20t%EC%8B%A4%EB%82%B4%EC%8B%9D%EB%AC%BC.jpg',175),(98,'https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%95%84%EC%9D%B4%ED%8C%A8%EB%93%9C%EC%97%90%EC%96%B41.jpg%282021-11-18%29%20-%20%EC%95%84%EC%9D%B4%ED%8C%A8%EB%93%9C%EC%97%90%EC%96%B41.jpg',176);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `item_content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `item_price` int NOT NULL,
  `item_category` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `item_address` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `item_area_code` int NOT NULL,
  `item_created_time` datetime NOT NULL,
  `item_modified_time` datetime NOT NULL,
  `item_is_active` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Y',
  `seller_id` int NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `FK_user_TO_item_1_idx` (`seller_id`),
  CONSTRAINT `FK_user_TO_item_1` FOREIGN KEY (`seller_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (59,'캠핑용 그릇 세트','캠핑용 식기 세트 대여해드립니다!',2000,'식기','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:20:12','2021-11-18 06:20:12','Y',28),(60,'여성용 한복 거의 새상품','S급이고 여성용 m 사이즈 입니다!',5000,'의복','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:20:52','2021-11-18 06:20:52','Y',28),(61,'강아지 원통 가방','강아지랑 피크닉 나가고 싶죠? 이 가방 하나면 준비 끝 ㅋ',3000,'동물','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:21:02','2021-11-18 06:21:02','Y',29),(62,'애플 에어팟 프로 정품','에어팟 프로 다른 이어폰 생겨서 대여해드립니다~~~',5000,'가전제품','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:21:38','2021-11-18 06:21:38','Y',28),(65,'JBL 블루투스 스피커','여행용으로 좋아요~',5000,'가전제품','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:22:05','2021-11-18 06:22:05','Y',28),(69,'플레이스테이션 5 - 게임 3개','게임 3개 까지 빌려드려요~',10000,'가전제품','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:22:55','2021-11-18 06:22:55','Y',28),(71,'슬램덩크 만화책 신권 전작 ','슬램덩크 만화책 전권 대여해드립니다!',8000,'서적','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:23:28','2021-11-18 06:23:28','Y',28),(72,'여성용 가발','가발 대여해드려요!',8000,'미용','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:23:59','2021-11-18 06:23:59','Y',28),(74,'Kodak 필름 카메라 ','필름은 따로 구매하셔야하고 기계만 빌려드립니당',1000,'사진','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:25:01','2021-11-18 06:25:01','Y',28),(76,'콘크리트 드릴','콘크리트 드릴 빌려드립니다.',5000,'공구','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:25:41','2021-11-18 06:25:41','Y',28),(78,'스팀 계정 빌려드립니다','게임 30개 보유중..!',5000,'게임','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:27:46','2021-11-18 06:27:46','Y',28),(80,'아이유 미니 5집 ','아이유 미니 5집 Love poem 빌려드려요~',2000,'음악','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:29:38','2021-11-18 06:29:38','Y',28),(95,'트럼펫','당분간 음악 관둬요',150000,'음악','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:36:19','2021-11-18 06:36:19','Y',29),(96,'이젤','예술적 감각을 유지하는 건 중요하죠',50000,'예술','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:36:53','2021-11-18 06:36:53','Y',29),(98,'산타클로스 복장','곧 크리스마스네요. 모두 행복했으면 좋겠어요',30000,'의복','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:37:37','2021-11-18 06:37:37','Y',29),(108,'롤렉스 시계','제가 한창 랩할 때 샀던 거에요. ',1000000,'명품','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:38:41','2021-11-18 06:38:41','Y',29),(109,'원목 이젤 10개','원목 이젤 10개',10000,'예술','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:39:22','2021-11-18 06:39:22','Y',28),(112,'포대기','포대기 빌려드려요~ 장기 대여 가능',1000,'육아','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:41:53','2021-11-18 06:41:53','Y',28),(113,'애견 유모차 대여해드려요~','애견 유모차 대여해드립니다! 중형견까지 가능한 사이즈에요!',10000,'동물','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:43:25','2021-11-18 06:43:25','Y',28),(114,'코펠세트','제드 스테인레스 캠쿡2 XL 캠핑 코펠 세트\n4인 가족이 캠핑장에서 사용하기 딱 적당한 크기와 구성품입니다!\n열탕소독하고 일광건조해서 관리해요 깨끗합니다',3000,'야외','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:43:25','2021-11-18 06:43:25','Y',26),(119,'캠핑용 그리들 30cm ','캠핑용 그리들 30cm 대여해드립니다! 관리 상태 좋아요',8000,'야외','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:45:03','2021-11-18 06:45:03','Y',28),(120,'캠핑용 알전구','캠핑용 알전구 대여해드려요. 총 길이는 4m이고 상태 좋습니다. 가격은 하루 1000원이고 설치해두면 분위기 좋고 이뻐요~~',1000,'야외','서울 강남구 테헤란로 212',11680,'2021-11-18 06:45:32','2021-11-18 06:45:32','Y',30),(121,'롱노즈','롱노즈로 전선을 잘라보세요',1000,'공구','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:46:00','2021-11-18 06:46:00','Y',29),(122,'Tom browne 정장 세트','톰브라운 정장 빌려드립니다.\n사이즈는 100 입니다',100000,'명품','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:46:31','2021-11-18 06:46:31','Y',28),(130,'전동 킥보드 ','전동 킥보드 대여해드려요 ! 최소 5일 이상만 대여해드립니다. ',15000,'기타','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:47:34','2021-11-18 06:47:34','Y',28),(141,'캠핑 테이블','트리 알루미늄 접이식 롤테이블\n상판을 말아서 보관하는 테이블이에요.\n크기는 118x55cm입니다!\n가벼워서 휴대하기 편리해요.\n',2000,'야외','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:50:17','2021-11-18 06:50:17','Y',26),(142,'다이슨 v15 청소기','말이 필요 없죠',100000,'가전제품','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:50:40','2021-11-18 06:50:40','Y',29),(143,'치즈 그레이터','치즈 그레이터 입니다.\n스테인리스라 녹도 안슬고 상태 좋아요\n가격은 하루 2000원입니다~',2000,'식기','서울 강남구 테헤란로 212',11680,'2021-11-18 06:50:43','2021-11-18 06:50:43','Y',30),(149,'캠핑해먹','모기 해먹 (스피드 오픈), 천막 걸이 텐트 세트\n드로 스트링없이 모기장이 자동으로 열립니다!\n재질: 210T 나일론 스피닝 암호화 메쉬\n크기: 290*140CM (플러스 또는 마이너스 3%)\n무게: 약 790g\n액세서리: 블랙 골드 스틸 버클 * 2, 더블 링 트리 벨트 * 2, 윈드 로프 * 2, 그라운드 네일 * 2 조각, 보관 가방 * 1 전용',2500,'야외','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:52:03','2021-11-18 06:52:03','Y',26),(150,'다이슨 스트레이트너','머리 쫙쫙 펴져요',200000,'미용','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:52:26','2021-11-18 06:52:26','Y',29),(151,'캠핑용 삽 칼 도끼','캠핑할 때 삽 칼 도끼는 필수죠',5000,'야외','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:53:11','2021-11-18 06:53:11','Y',29),(152,'캠핑카','캠핑카 대여하고 캠핑 즐기실분?',100000,'야외','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:54:04','2021-11-18 06:54:04','Y',29),(153,'금그릇','이걸로 생일상을 받으면 기분이 조크든요',50000,'식기','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:54:44','2021-11-18 06:54:44','Y',29),(154,'토비의 스프링','스프링의 기초. 배움에는 끝이 없죠.',1000,'서적','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:56:22','2021-11-18 06:56:22','Y',29),(155,'정장 풀세트','그레이색 정장 풀세트 입니다.',10000,'의복','서울 강남구 테헤란로 212',11680,'2021-11-18 06:56:23','2021-11-18 06:56:23','Y',30),(156,'토스트기','아침에 간단하게 토스트 하나 먹으면 신나게 하루를 시작할 수 있어요.',5000,'가전제품','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:57:42','2021-11-18 06:57:42','Y',29),(157,'다이슨 에어랩 스타일러 컴플리트','다이슨 에어랩 스타일러 컴플리트입니다.\n프리스타일링 드라이어, 소프트 스무딩 브러쉬, 펌 스무딩 브러쉬, 30mm / 40mm 배럴, 라운드 볼륨 브러쉬 들어있어요!\n사용후 소독하여 관리합니다.\n연락주세요',10000,'미용','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:57:53','2021-11-18 06:57:53','Y',26),(158,'그릴','아 여기다 고기 구워먹으면 엄청 맛있는데,, 그 맛을 아는 사람만 빌릴 수 있어요.',20000,'야외','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:58:36','2021-11-18 06:58:36','Y',29),(159,'캐논 카메라','캐논 EOS 200D 입니다. \n화질 정말 좋아요',20000,'사진','서울 강남구 테헤란로 212',11680,'2021-11-18 06:58:52','2021-11-18 06:58:52','Y',30),(160,'무대조명','led무빙 / 7r빔조명 / 4구쥬피터 / 무빙더비 / led스파이더 ',12000,'가전제품','서울 강남구 역삼동 718-5',11680,'2021-11-18 06:59:50','2021-11-18 06:59:50','Y',26),(161,'오디오엔진a2+bt','오디오엔진a2+bt 입니다.\n무손실 음원 지원됩니다~~',6000,'가전제품','서울 강남구 테헤란로 212',11680,'2021-11-18 07:00:49','2021-11-18 07:00:49','Y',30),(162,'컵/접시 세트','집에 안쓰는 접시세트가 있어서 내놔요 ㅎㅎ 깨끗하게 써주실분만 연락주세요!',1000,'식기','서울 관악구 신림동 산 56-1',11620,'2021-11-18 07:01:17','2021-11-18 07:01:17','Y',31),(163,'후지필름 인스탁스 미니 11','필름은 알아서 사서 쓰세요.',10000,'사진','서울 강남구 역삼동 718-5',11680,'2021-11-18 07:01:28','2021-11-18 07:01:28','Y',29),(164,'토비의 스프링','토비의 스프링 교재입니다.\n스프링 학습에 정말 유용해요.',2000,'서적','서울 강남구 테헤란로 212',11680,'2021-11-18 07:02:05','2021-11-18 07:02:05','Y',30),(165,'스탠딩 모니터','50인치, 938mm x 650mm \n모니터와 스탠드 거치대 세트입니다.\n전시회, 박람회, 웨딩, 촬영 등에 사용하기 좋은 대형 모니터 TV입니다.',22000,'가전제품','서울 강남구 역삼동 718-5',11680,'2021-11-18 07:02:18','2021-11-18 07:02:18','Y',26),(166,'다이슨 가습 공기청정기','이걸로 미세먼지 대비하면 폐에 좋아요',90000,'가전제품','서울 강남구 역삼동 718-5',11680,'2021-11-18 07:03:22','2021-11-18 07:03:22','Y',29),(167,'다이슨 에어랩','다이슨 에어랩\n드라이 기능도 포함되어 유용해요~',3000,'미용','서울 강남구 테헤란로 212',11680,'2021-11-18 07:03:31','2021-11-18 07:03:31','Y',30),(168,'다이슨 라이트 사이클 모프','개발할 때 다이슨 조명 사용하면 에러 하나도 안나더라구요.',100000,'가전제품','서울 강남구 역삼동 718-5',11680,'2021-11-18 07:04:31','2021-11-18 07:04:31','Y',29),(169,'공구박스','공구박스 빌려드립니다~\n사진에 있는 공구 다 포함되있어요',3000,'공구','서울 강남구 테헤란로 212',11680,'2021-11-18 07:05:09','2021-11-18 07:05:09','Y',30),(170,'닌텐도 스위치','닌텐도 스위치 빌려드립니다.\n동물의숲 가능해요',5000,'게임','서울 강남구 테헤란로 212',11680,'2021-11-18 07:06:36','2021-11-18 07:06:36','Y',30),(171,'닌텐도 스위치 동물의숲 에디션','닌텐도 스위치 프로 동물의숲 에디션\n모니터 공유 독 세트입니다!!\n투명 젤리 케이스 끼워져있습니다.\n궁금하신 점 편하게 연락주세요',3000,'가전제품','서울 강남구 역삼동 718-5',11680,'2021-11-18 07:06:39','2021-11-18 07:06:39','Y',26),(173,'egg 유모차','우리 아이의 안락한 산책을 위하여',200000,'육아','서울 강남구 역삼동 718-5',11680,'2021-11-18 07:08:03','2021-11-18 07:08:03','Y',29),(174,'톰과 제리 게임 cd','제리가 톰에게 잡아 먹히지 않도록 도와 주세요.',1000,'게임','서울 강남구 역삼동 718-5',11680,'2021-11-18 07:09:56','2021-11-18 07:09:56','Y',29),(175,'실내용 나무(조화)','높이 약 110cm입니다.\n일일촬영 세트장용으로 적합한 조화 나무입니다!',8000,'기타','서울 강남구 역삼동 718-5',11680,'2021-11-18 07:10:02','2021-11-18 07:10:02','Y',26),(176,'아이패드 에어1','배터리는 오래돼서 금방 닳으니 충전해서 사용하셔야해요 관심있으시면 문의주세요!',3000,'가전제품','서울 관악구 신림동 산 56-1',11620,'2021-11-18 07:11:08','2021-11-18 07:11:08','Y',31);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `notice_id` int NOT NULL AUTO_INCREMENT,
  `notice_title` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `notice_content` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `notice_time` datetime NOT NULL,
  `notice_is_read` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'N',
  `item_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`notice_id`),
  KEY `FK_item_TO_notice_1_idx` (`item_id`),
  CONSTRAINT `FK_item_TO_notice_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_nickname` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_password` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_salt` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_address` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_area_code` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_image_url` varchar(350) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_auth_level` int NOT NULL DEFAULT '1',
  `user_refresh_token` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (26,'레몬왕자','ounog@naver.com','$2a$10$0DgLoK7YHBjIA3l.55aTZOmgpfgiJpx1bOJf6NNjkODtFFOU8jKqG',NULL,'서울 강남구 역삼동 718-5','11680','https://yam-s3.s3.ap-northeast-2.amazonaws.com/profile/ounog%40naver.com%282021-11-18%29%20-%20edc6de63-6abc-48c5-a0a9-26890b3302ac-profile_image-300x300.jpg',1,NULL),(27,'테스트계정','test@test.com','$2a$10$0DgLoK7YHBjIA3l.55aTZOmgpfgiJpx1bOJf6NNjkODtFFOU8jKqG',NULL,NULL,'0','https://yam-s3.s3.ap-northeast-2.amazonaws.com/profile/defaultImage.png',1,NULL),(28,'김싸피싸피','ppko1233@gmail.com','$2a$10$EzYv19WNOHaW8K76Av/BK.bN30vS6rfZ3a1JkxIiUi/pemwmEye6m',NULL,'서울 강남구 역삼동 718-5','11680','https://yam-s3.s3.ap-northeast-2.amazonaws.com/profile/ppko1233%40gmail.com%282021-11-18%29%20-%2099ECC0335D95C48622.jpeg',1,NULL),(29,'옥흐여친','minzminzm@gmail.com','$2a$10$IKlsSHbyXNVyHGHGHDaCbOV6CVPrdVyfMA4fowVCHD8b0QiugPIb2',NULL,'서울 강남구 역삼동 718-5','11680','https://yam-s3.s3.ap-northeast-2.amazonaws.com/profile/minzminzm%40gmail.com%282021-11-18%29%20-%20%EC%98%A5%ED%9D%90.jpg',1,NULL),(30,'이진호','jinho_pca@naver.com','$2a$10$zbpueh8.H5exkq7g4UGV4.WBb14eshBRrCFB3EoJXf2fc3/VHVC6q',NULL,'서울 강남구 테헤란로 212','11680','https://yam-s3.s3.ap-northeast-2.amazonaws.com/profile/defaultImage.png',1,NULL),(31,'영린','sqk8657@gmail.com','$2a$10$9XJReV/s0XNPKCI2q4NPseViihnGNekJvx8WZM53MqKe/rBdYDCoa',NULL,'서울 관악구 신림동 산 56-1','11620','https://yam-s3.s3.ap-northeast-2.amazonaws.com/profile/defaultImage.png',1,NULL),(32,'하이에이치아이','qwer@qwer.com','$2a$10$I8IDvzvRRhlCnl0ygMla3u7QlddCy02PskGCNHW/IkzY8xkt3jLay',NULL,NULL,'0','https://yam-s3.s3.ap-northeast-2.amazonaws.com/profile/defaultImage.png',1,NULL),(33,'얌얌쩝쩝','asd@asd.com','$2a$10$OWqB4Ff/c9Tr1.a9rJS8SuosbrK8ykG0HtFn5AZrYSm42QAZ3hUUq',NULL,'서울 강남구 역삼동 718-5','11680','https://yam-s3.s3.ap-northeast-2.amazonaws.com/profile/asd%40asd.com%282021-11-18%29%20-%20images.jpeg',1,NULL),(34,'옥흐딸래미','ivo___ovi@naver.com','$2a$10$iSqAsiAnnrV0pnCEE4gnw.Mhytcr0ryJylCWe7VmvQXOr/9Qy4BKS',NULL,'서울 강남구 역삼동 718-5','11680','https://yam-s3.s3.ap-northeast-2.amazonaws.com/profile/defaultImage.png',1,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_authority`
--

DROP TABLE IF EXISTS `user_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_authority` (
  `user_id` int NOT NULL,
  `authority_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`,`authority_name`),
  KEY `authority_name` (`authority_name`),
  CONSTRAINT `user_authority_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `user_authority_ibfk_2` FOREIGN KEY (`authority_name`) REFERENCES `authority` (`authority_name`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authority`
--

LOCK TABLES `user_authority` WRITE;
/*!40000 ALTER TABLE `user_authority` DISABLE KEYS */;
INSERT INTO `user_authority` VALUES (26,'ROLE_USER'),(28,'ROLE_USER'),(29,'ROLE_USER'),(30,'ROLE_USER'),(31,'ROLE_USER'),(32,'ROLE_USER'),(33,'ROLE_USER'),(34,'ROLE_USER');
/*!40000 ALTER TABLE `user_authority` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-18 17:59:50
