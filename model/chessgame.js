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


function  checkDatabase(){
    const tableExist = "CREATE TABLE `chessgame` ( \
        `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la partie', \
        `whiteplayerid` int(11) DEFAULT NULL COMMENT 'ID du player qui joue avec les blancs', \
        `blackplayerid` int(11) DEFAULT NULL COMMENT 'ID du joueur qui joue avec les noirs', \
        `name` varchar(45) DEFAULT NULL COMMENT 'Nom de la partie', \
        `playerturn` varchar(1) NOT NULL DEFAULT 'W' COMMENT 'identifiant de la couleurqui doit jouer : W or B', \
        `a1` varchar(2) DEFAULT 'TB' COMMENT 'case a1 du jeu d''echec', \
        `b1` varchar(2) DEFAULT 'CB' COMMENT 'case b1 du jeu d''echec', \
        `c1` varchar(2) DEFAULT 'FB' COMMENT 'Case c1 du jeu d''echec', \
        `d1` varchar(2) DEFAULT 'DB' COMMENT 'Case d1 du jeu d''echec', \
        `e1` varchar(2) DEFAULT 'RB' COMMENT 'Case e1 du jeu d''echec', \
        `f1` varchar(2) DEFAULT 'FB' COMMENT 'Case f1 du jeu d''echec', \
        `g1` varchar(2) DEFAULT 'CB' COMMENT 'Case g1 du jeu d''echec', \
        `h1` varchar(2) DEFAULT 'TB' COMMENT 'Case h1 du jeu d''echec', \
        `a2` varchar(2) DEFAULT 'PB' COMMENT 'case a2 du jeu d''echec', \
        `b2` varchar(2) DEFAULT 'PB' COMMENT 'case b2 du jeu d''echec', \
        `c2` varchar(2) DEFAULT 'PB' COMMENT 'Case c2 du jeu d''echec', \
        `d2` varchar(2) DEFAULT 'PB' COMMENT 'Case d2 du jeu d''echec', \
        `e2` varchar(2) DEFAULT 'PB' COMMENT 'Case e2 du jeu d''echec', \
        `f2` varchar(2) DEFAULT 'PB' COMMENT 'Case f2 du jeu d''echec', \
        `g2` varchar(2) DEFAULT 'PB' COMMENT 'Case g2 du jeu d''echec', \
        `h2` varchar(2) DEFAULT 'PB' COMMENT 'Case h2 du jeu d''echec', \
        `a3` varchar(2) DEFAULT '' COMMENT 'case a3 du jeu d''echec', \
        `b3` varchar(2) DEFAULT '' COMMENT 'case b3 du jeu d''echec', \
        `c3` varchar(2) DEFAULT '' COMMENT 'Case c3 du jeu d''echec', \
        `d3` varchar(2) DEFAULT '' COMMENT 'Case d3 du jeu d''echec', \
        `e3` varchar(2) DEFAULT '' COMMENT 'Case e3 du jeu d''echec', \
        `f3` varchar(2) DEFAULT '' COMMENT 'Case f3 du jeu d''echec', \
        `g3` varchar(2) DEFAULT '' COMMENT 'Case g3 du jeu d''echec', \
        `h3` varchar(2) DEFAULT '' COMMENT 'Case h3 du jeu d''echec', \
        `a4` varchar(2) DEFAULT '' COMMENT 'case a4 du jeu d''echec', \
        `b4` varchar(2) DEFAULT '' COMMENT 'case b4 du jeu d''echec', \
        `c4` varchar(2) DEFAULT '' COMMENT 'Case c4 du jeu d''echec', \
        `d4` varchar(2) DEFAULT '' COMMENT 'Case d4 du jeu d''echec', \
        `e4` varchar(2) DEFAULT '' COMMENT 'Case e4 du jeu d''echec', \
        `f4` varchar(2) DEFAULT '' COMMENT 'Case f4 du jeu d''echec', \
        `g4` varchar(2) DEFAULT '' COMMENT 'Case g4 du jeu d''echec', \
        `h4` varchar(2) DEFAULT '' COMMENT 'Case h4 du jeu d''echec', \
        PRIMARY KEY (`id`) , \
        KEY `whiteplayer_idx` (`whiteplayerid`), \
        KEY `blackplayer_idx` (`blackplayerid`), \
        CONSTRAINT `blackplayer` FOREIGN KEY (`blackplayerid`) REFERENCES `users` (`id`), \
        CONSTRAINT `whiteplayer` FOREIGN KEY (`whiteplayerid`) REFERENCES `users` (`id`) \
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='Table enregistrant les joueurs d''une partie et la situation courante des pièces';"
    mysqlConnection.query(tableExist, (err, res) => {
        if (err) {
            //logger.debug("DB INSERT failed");
            logger.debug(err.message);
            return false;
        }
        //logger.debug("DB INSERT succeed");
        logger.debug(res);
        return true;
    });
}

//TODO
//checkDatabase();


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

    //mysqlConnection.end();