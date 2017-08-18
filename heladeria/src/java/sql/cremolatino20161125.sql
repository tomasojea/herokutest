

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/ `cremo` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `cremo`;


DROP TABLE IF EXISTS `heladerias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `heladerias` (
  `hel_nombre` varchar(255) DEFAULT NULL,
  `hel_dire` varchar(255) DEFAULT NULL,
  `hel_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`hel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `heladerias` WRITE;
/*!40000 ALTER TABLE `heladerias` DISABLE KEYS */;
INSERT INTO `heladerias` VALUES ('San Telmo 1','Peru 823',1),('Belgrano 2','Montaneses 20',2),('Caballito 3','Doblas 321',3);
/*!40000 ALTER TABLE `heladerias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventarios`
--

DROP TABLE IF EXISTS `inventarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventarios` (
  `inv_hel_id` int(11) DEFAULT NULL,
  `inv_sab_id` int(11) DEFAULT NULL,
  `inv_cantidad` int(11) DEFAULT NULL,
  UNIQUE KEY `uk_hel_sab` (`inv_hel_id`,`inv_sab_id`),
  KEY `fk_sabores` (`inv_sab_id`),
  CONSTRAINT `fk_heladerias` FOREIGN KEY (`inv_hel_id`) REFERENCES `heladerias` (`hel_id`),
  CONSTRAINT `fk_sabores` FOREIGN KEY (`inv_sab_id`) REFERENCES `sabores` (`sab_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventarios`
--

LOCK TABLES `inventarios` WRITE;
/*!40000 ALTER TABLE `inventarios` DISABLE KEYS */;
INSERT INTO `inventarios` VALUES (3,6,150),(3,5,100),(3,1,100),(2,1,100),(2,3,250),(1,3,0),(1,6,100);
/*!40000 ALTER TABLE `inventarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sabores`
--

DROP TABLE IF EXISTS `sabores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sabores` (
  `sab_nombre` varchar(200) DEFAULT NULL,
  `sab_calorias` varchar(200) DEFAULT NULL,
  `sab_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`sab_id`),
  UNIQUE KEY `unico_nombre_sabores` (`sab_nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sabores`
--

LOCK TABLES `sabores` WRITE;
/*!40000 ALTER TABLE `sabores` DISABLE KEYS */;
INSERT INTO `sabores` VALUES ('Mousse de Limon','2000',1),('Sambayon Italiano','5000',3),('Sambayon Frances','5000',5),('Pistacho','3000',6);
/*!40000 ALTER TABLE `sabores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
