const logger = require('../config/logger');
//const  DB = require("../config/dbconfig");
//const mysqlConnection = DB.mysqlConnection;

const MySQL = require('mysql');

logger.debug("chessgame avant MySQL.createConnection");
/*const mysqlConnection = MySQL.createConnection({
    host: 'localhost', //192.168.2.47
    port: '3306',
    user: 'user_appgfo',
    password: 'AppChess,2021',
    database: 'gfo'
});*/
const mysqlConnection = MySQL.createConnection({
    host: process.env.DB_HOST, //192.168.2.47
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

process.on('beforeExit',() => {
    logger.fatal("beforeExit");
});
process.on('SIGINT',() => {
    logger.fatal("SIGINT");
    process.exit(0);
});
process.on('SIGTERM',() => {
    logger.fatal("SIGTERM");
    process.exit(0);
});

logger.debug("chessgame après MySQL.createConnection");

/*mysqlConnection.connect((err) => {
    if (!err)
        logger.debug("DB connection succeed");
    else {
        logger.debug("DB connection failed");
        logger.debug(err);
    }
});*/



function saveChessGame(game, callback) {
    const insertUser = "INSERT INTO chessgame \
    (whiteplayerid, blackplayerid, name) \
    VALUES (? , ? , ?)";
    mysqlConnection.query(insertUser, game, (err, res) => {
        if (err) {
            logger.debug("DB INSERT failed");
            logger.debug(err.message);
            return callback(err, null);
        }
        logger.debug("DB INSERT succeed");
        logger.debug(res);
        return callback(null, res);
    });
}

function findOneChessGame(id, callback) {
    const selectUser = "SELECT * FROM chessgame WHERE id=?";
    try {
        mysqlConnection.query(selectUser, [id], (err, res) => {
            if (err) {
                logger.debug("DB SELECT ONE failed");
                logger.debug(err.message);
                return callback(err, null);
            }
            logger.debug("DB SELECT ONE succeed");
            logger.debug(res);
            return callback(null, res);

            /*if (err) {
                logger.debug("DB SELECT ONE failed");
                logger.debug(err.message);
                //logger.debug(err.stack);
                //throw err;
                return err.message;
            }
            logger.debug("DB SELECT ONE succeed");
            logger.debug(res);
            //logger.debug(res.insertId);
            logger.debug(res.length);
            return res;*/
        });
    }
    catch (err) {
        logger.debug("dans le catch");
    }
}

function findAllChessGames(callback) {
    const selectUser = "SELECT * FROM chessgame";

    mysqlConnection.query(selectUser, (err, res) => {
        if (err) {
            logger.debug("DB SELECT ALL failed");
            logger.debug(err.message);
            return callback(err, null);
        }
        logger.debug("DB SELECT ALL succeed");
        logger.debug(res);
        return callback(null, res);

        /*
                if (err) {
                    logger.debug("DB SELECT ALL failed");
                    logger.debug(err.message);
                    //logger.debug(err.stack);
                    //throw err;
                    return err.message;
                }
                logger.debug("DB SELECT ALL succeed");
                //logger.debug(res);
                logger.debug(res.length);
                return res;*/
    });
}
/*try {
    saveUser("gforestier2000@yahoo.fr", "Guillaume", "Forestier");
}
catch (err) {
    logger.debug("DB INSERT failed lors de l'appel de save");
    logger.debug(err.message);
    //logger.debug(err);
}*/


function deleteOneChessGame(id, callback) {
    const deleteUser = "DELETE FROM chessgame WHERE id=?";
    mysqlConnection.query(deleteUser, [id], (err, res) => {
        if (err) {
            logger.debug("DB DELETE ONE failed");
            logger.debug(err.message);
            return callback(err, null);
        }
        logger.debug("DB DELETE ONE succeed");
        logger.debug(res);
        return callback(null, res);
    });
}

function updateOneChessGame(id,game,callback){
    //const updateUser = "UPDATE users SET email = ?, firstname = ?, lastname = ?  WHERE id=?";

            /*playerturn = ?, \
        a1 = ?, \
        b1 = ?, \
        c1 = ? \*/
    const updateChessgame = "UPDATE chessgame SET \
        whiteplayerid = ?, \
        blackplayerid = ?, \
        name = ? \
        WHERE id=?";
    logger.debug("UPDATE chessgame : " + updateChessgame);
    game.push(id);
    logger.debug(game);
    mysqlConnection.query(updateChessgame, game, (err, res) => {
        if (err) {
            logger.error("DB UPDATE ONE failed");
            logger.error(err.message);
            return callback(err, null);
        }
        logger.debug("DB UPDATE ONE succeed");
        logger.debug(res);
        return callback(null, res);
    });
}

module.exports.saveChessGame = saveChessGame;
module.exports.findOneChessGame = findOneChessGame;
module.exports.findAllChessGames = findAllChessGames;
module.exports.deleteOneChessGame = deleteOneChessGame;
module.exports.updateOneChessGame = updateOneChessGame;



/*
DROP TABLE IF EXISTS `chessgame`;
CREATE TABLE IF NOT EXISTS `chessgame` (
    `id` INTEGER NOT NULL auto_increment , 
    `title` VARCHAR(255), 
    `description` VARCHAR(255), 
    `published` TINYINT(1), 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL, 
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;
SHOW INDEX FROM `tutorials`
*/

/*CREATE TABLE `gfo`.`chessgame` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'ID de la partie',
    `whiteplayerid` INT NULL COMMENT 'ID du player qui joue avec les blancs',
    `blackplayerid` INT NULL COMMENT 'ID du joueur qui joue avec les noirs',
    `name` VARCHAR(45) NULL COMMENT 'Nom de la partie',
    `playerturn` VARCHAR(1) NOT NULL DEFAULT 'W' COMMENT 'identifiant de la couleurqui doit jouer : W or B',
    `a1` VARCHAR(2) NULL DEFAULT 'TB' COMMENT 'case a1 du jeu d\'echec',
    `b1` VARCHAR(2) NULL DEFAULT 'CB',
    PRIMARY KEY (`id`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8
  COMMENT = 'Table enregistrant les joueurs d\'une partie et la situation courante des pièces';
 */

  /*
  ALTER TABLE `gfo`.`chessgame` 
ADD INDEX `whiteplayer_idx` (`whiteplayerid` ASC) VISIBLE,
ADD INDEX `blackplayer_idx` (`blackplayerid` ASC) VISIBLE;
;
ALTER TABLE `gfo`.`chessgame` 
ADD CONSTRAINT `whiteplayer`
  FOREIGN KEY (`whiteplayerid`)
  REFERENCES `gfo`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `blackplayer`
  FOREIGN KEY (`blackplayerid`)
  REFERENCES `gfo`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  */

/*  ALTER TABLE `gfo`.`chessgame` 
ADD COLUMN `c1` VARCHAR(2) NULL DEFAULT 'FB' COMMENT 'Case c1 du jeu d\'echec' AFTER `b1`;
*/
/*
"INSERT INTO chessgame \
    (whiteplayerid, blackplayerid, name, playerturn) \
    VALUES (25 , 26 , "partie de base", "W")" */
    