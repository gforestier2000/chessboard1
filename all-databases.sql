-- MariaDB dump 10.19  Distrib 10.6.4-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: chess
-- ------------------------------------------------------
-- Server version	10.6.4-MariaDB-1:10.6.4+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `chess`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `chess` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `chess`;

--
-- Table structure for table `chessgame`
--

DROP TABLE IF EXISTS `chessgame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chessgame` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la partie',
  `whiteplayerid` int(11) DEFAULT NULL COMMENT 'ID du player qui joue avec les blancs',
  `blackplayerid` int(11) DEFAULT NULL COMMENT 'ID du joueur qui joue avec les noirs',
  `name` varchar(45) DEFAULT NULL COMMENT 'Nom de la partie',
  `playerturn` varchar(1) NOT NULL DEFAULT 'W' COMMENT 'identifiant de la couleurqui doit jouer : W or B',
  `a1` varchar(2) DEFAULT 'TB' COMMENT 'case a1 du jeu d''echec',
  `b1` varchar(2) DEFAULT 'CB' COMMENT 'case b1 du jeu d''echec',
  `c1` varchar(2) DEFAULT 'FB' COMMENT 'Case c1 du jeu d''echec',
  `d1` varchar(2) DEFAULT 'DB' COMMENT 'Case d1 du jeu d''echec',
  `e1` varchar(2) DEFAULT 'RB' COMMENT 'Case e1 du jeu d''echec',
  `f1` varchar(2) DEFAULT 'FB' COMMENT 'Case f1 du jeu d''echec',
  `g1` varchar(2) DEFAULT 'CB' COMMENT 'Case g1 du jeu d''echec',
  `h1` varchar(2) DEFAULT 'TB' COMMENT 'Case h1 du jeu d''echec',
  `a2` varchar(2) DEFAULT 'PB' COMMENT 'case a2 du jeu d''echec',
  `b2` varchar(2) DEFAULT 'PB' COMMENT 'case b2 du jeu d''echec',
  `c2` varchar(2) DEFAULT 'PB' COMMENT 'Case c2 du jeu d''echec',
  `d2` varchar(2) DEFAULT 'PB' COMMENT 'Case d2 du jeu d''echec',
  `e2` varchar(2) DEFAULT 'PB' COMMENT 'Case e2 du jeu d''echec',
  `f2` varchar(2) DEFAULT 'PB' COMMENT 'Case f2 du jeu d''echec',
  `g2` varchar(2) DEFAULT 'PB' COMMENT 'Case g2 du jeu d''echec',
  `h2` varchar(2) DEFAULT 'PB' COMMENT 'Case h2 du jeu d''echec',
  `a3` varchar(2) DEFAULT '' COMMENT 'case a3 du jeu d''echec',
  `b3` varchar(2) DEFAULT '' COMMENT 'case b3 du jeu d''echec',
  `c3` varchar(2) DEFAULT '' COMMENT 'Case c3 du jeu d''echec',
  `d3` varchar(2) DEFAULT '' COMMENT 'Case d3 du jeu d''echec',
  `e3` varchar(2) DEFAULT '' COMMENT 'Case e3 du jeu d''echec',
  `f3` varchar(2) DEFAULT '' COMMENT 'Case f3 du jeu d''echec',
  `g3` varchar(2) DEFAULT '' COMMENT 'Case g3 du jeu d''echec',
  `h3` varchar(2) DEFAULT '' COMMENT 'Case h3 du jeu d''echec',
  `a4` varchar(2) DEFAULT '' COMMENT 'case a4 du jeu d''echec',
  `b4` varchar(2) DEFAULT '' COMMENT 'case b4 du jeu d''echec',
  `c4` varchar(2) DEFAULT '' COMMENT 'Case c4 du jeu d''echec',
  `d4` varchar(2) DEFAULT '' COMMENT 'Case d4 du jeu d''echec',
  `e4` varchar(2) DEFAULT '' COMMENT 'Case e4 du jeu d''echec',
  `f4` varchar(2) DEFAULT '' COMMENT 'Case f4 du jeu d''echec',
  `g4` varchar(2) DEFAULT '' COMMENT 'Case g4 du jeu d''echec',
  `h4` varchar(2) DEFAULT '' COMMENT 'Case h4 du jeu d''echec',
  PRIMARY KEY (`id`),
  KEY `whiteplayer_idx` (`whiteplayerid`),
  KEY `blackplayer_idx` (`blackplayerid`),
  CONSTRAINT `blackplayer` FOREIGN KEY (`blackplayerid`) REFERENCES `users` (`id`),
  CONSTRAINT `whiteplayer` FOREIGN KEY (`whiteplayerid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='Table enregistrant les joueurs d''une partie et la situation courante des piÔö£┬┐ces';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chessgame`
--

LOCK TABLES `chessgame` WRITE;
/*!40000 ALTER TABLE `chessgame` DISABLE KEYS */;
/*!40000 ALTER TABLE `chessgame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id de l''utilisateur',
  `email` varchar(250) NOT NULL COMMENT 'email de l''utilisateur',
  `firstname` varchar(250) DEFAULT NULL COMMENT 'pr├®nom de l''utilisateur',
  `lastname` varchar(250) DEFAULT NULL COMMENT 'nom de l''utilisateur',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='Utilisateurs de l''application';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'gforestier2000@yahoo.fr','Guillaume','Forestier'),(2,'jubaaitidir@gmail.com','Juba','Ait Idir');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-26 17:29:08
