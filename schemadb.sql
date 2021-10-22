-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: chess
-- ------------------------------------------------------
-- Server version       8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `chess`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `chess` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `chess`;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id de l''utilisateur',
  `email` varchar(250) NOT NULL COMMENT 'email de l''utilisateur',
  `firstname` varchar(250) DEFAULT NULL COMMENT 'prénom de l''utilisateur',
  `lastname` varchar(250) DEFAULT NULL COMMENT 'nom de l''utilisateur',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4  COMMENT='Utilisateurs de l''application';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chessgame`
--

DROP TABLE IF EXISTS `chessgame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chessgame` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID de la partie',
  `whiteplayerid` int DEFAULT NULL COMMENT 'ID du player qui joue avec les blancs',
  `blackplayerid` int DEFAULT NULL COMMENT 'ID du joueur qui joue avec les noirs',
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3 COMMENT='Table enregistrant les joueurs d''une partie et la situation courante des pi├¿ces';
/*!40101 SET character_set_client = @saved_cs_client */;


CREATE USER 'appchess'@'%' IDENTIFIED VIA mysql_native_password USING '***';
GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'appchess'@'%' REQUIRE NONE WITH 
MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;

CREATE USER 'appchess1'@'%' IDENTIFIED VIA mysql_native_password USING '***';
GRANT USAGE ON *.* TO 'appchess1'@'%' REQUIRE NONE WITH 
MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT ALL PRIVILEGES ON `gfo`.* TO 'appchess1'@'%'
-- Dump completed on 2021-10-21 15:34:25
