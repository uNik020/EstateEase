-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: finalproject
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `property_id` bigint NOT NULL AUTO_INCREMENT,
  `area` double DEFAULT NULL,
  `bathrooms` varchar(30) DEFAULT NULL,
  `bedrooms` varchar(30) DEFAULT NULL,
  `owners_contact` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `owners_email` varchar(100) DEFAULT NULL,
  `owner_name` varchar(100) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `image_path` varchar(100) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `location_id` bigint NOT NULL,
  `owner_id` bigint NOT NULL,
  PRIMARY KEY (`property_id`),
  KEY `FK2ites4e9383wf41m3xlyyr3sb` (`location_id`),
  KEY `FKjrxgmdv6y6703yh1o9mjo9lx9` (`owner_id`),
  CONSTRAINT `FK2ites4e9383wf41m3xlyyr3sb` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`),
  CONSTRAINT `FKjrxgmdv6y6703yh1o9mjo9lx9` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,470,'1','2',NULL,'2bhk flat for family of 4 to 5 people',NULL,NULL,3400000,'WhatsApp Image 2024-09-05 at 3.35.24 PM (2).jpeg','For Sell','Apartment',1,1),(2,350,'1','1',NULL,' 1bhk flat in vasai',NULL,NULL,6000,'carousel-1.jpg','For Rent','House',2,1),(3,400,'0','0',NULL,'plot under 10000 rent',NULL,NULL,10000,'WhatsApp Image 2024-09-05 at 3.35.24 PM (2).jpeg','For Rent','Plot',3,1),(4,1500,'2','2',NULL,'royal vill with affordable price',NULL,NULL,7000000,'hero2.jpg','For Sell','Villa',4,1),(8,900,'0','0',NULL,'land with green grass near satara village',NULL,NULL,2400000,'WhatsApp Image 2024-09-05 at 3.35.24 PM.jpeg','For Sell','Plot',8,2),(10,200,'1','0',NULL,'small 1RK for single person',NULL,NULL,3000,'WhatsApp Image 2024-09-05 at 3.35.26 PM (1).jpeg','SOLD','Apartment',10,1),(11,600,'2','2',NULL,'2bhk villa ,rent per day',NULL,NULL,1000,'home.jpg','SOLD','Villa',11,1),(12,2000,'2','2',NULL,'A beach view villa for rent per day',NULL,NULL,1500,'about.jpg','SOLD','Villa',12,1),(13,200,'1','1',NULL,'1bhk flat for single person',NULL,NULL,3500,'WhatsApp Image 2024-09-05 at 3.35.21 PM.jpeg','SOLD','Apartment',13,1),(14,250,'1','1',NULL,'1bhk apartment in navi mumbai region for small family.',NULL,NULL,4000,'WhatsApp Image 2024-09-05 at 3.35.24 PM (1).jpeg','SOLD','Apartment',14,5);
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-24 20:47:58
