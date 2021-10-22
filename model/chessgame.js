//const  DB = require("../config/dbconfig");
//const mysqlConnection = DB.mysqlConnection;

const MySQL = require('mysql');

console.log("chessgame avant MySQL.createConnection");
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

console.log("chessgame après MySQL.createConnection");

/*mysqlConnection.connect((err) => {
    if (!err)
        console.log("DB connection succeed");
    else {
        console.log("DB connection failed");
        console.log(err);
    }
});*/



function saveChessGame(game, callback) {
    const insertUser = "INSERT INTO chessgame \
    (whiteplayerid, blackplayerid, name, playerturn, a1, b1, c1) \
    VALUES (? , ? , ?, ?, ?, ?, ?)";
    mysqlConnection.query(insertUser, game, (err, res) => {
        if (err) {
            console.log("DB INSERT failed");
            console.log(err.message);
            return callback(err, null);
        }
        console.log("DB INSERT succeed");
        console.log(res);
        return callback(null, res);
    });
}

function findOneChessGame(id, callback) {
    const selectUser = "SELECT * FROM chessgame WHERE id=?";
    try {
        mysqlConnection.query(selectUser, [id], (err, res) => {
            if (err) {
                console.log("DB SELECT ONE failed");
                console.log(err.message);
                return callback(err, null);
            }
            console.log("DB SELECT ONE succeed");
            console.log(res);
            return callback(null, res);

            /*if (err) {
                console.log("DB SELECT ONE failed");
                console.log(err.message);
                //console.log(err.stack);
                //throw err;
                return err.message;
            }
            console.log("DB SELECT ONE succeed");
            console.log(res);
            //console.log(res.insertId);
            console.log(res.length);
            return res;*/
        });
    }
    catch (err) {
        console.log("dans le catch");
    }
}

function findAllChessGames(callback) {
    const selectUser = "SELECT * FROM chessgame";

    mysqlConnection.query(selectUser, (err, res) => {
        if (err) {
            console.log("DB SELECT ALL failed");
            console.log(err.message);
            return callback(err, null);
        }
        console.log("DB SELECT ALL succeed");
        console.log(res);
        return callback(null, res);

        /*
                if (err) {
                    console.log("DB SELECT ALL failed");
                    console.log(err.message);
                    //console.log(err.stack);
                    //throw err;
                    return err.message;
                }
                console.log("DB SELECT ALL succeed");
                //console.log(res);
                console.log(res.length);
                return res;*/
    });
}
/*try {
    saveUser("gforestier2000@yahoo.fr", "Guillaume", "Forestier");
}
catch (err) {
    console.log("DB INSERT failed lors de l'appel de save");
    console.log(err.message);
    //console.log(err);
}*/


function deleteOneChessGame(id, callback) {
    const deleteUser = "DELETE FROM chessgame WHERE id=?";
    mysqlConnection.query(deleteUser, [id], (err, res) => {
        if (err) {
            console.log("DB DELETE ONE failed");
            console.log(err.message);
            return callback(err, null);
        }
        console.log("DB DELETE ONE succeed");
        console.log(res);
        return callback(null, res);
    });
}

function updateOneChessGame(id,game,callback){
    //const updateUser = "UPDATE users SET email = ?, firstname = ?, lastname = ?  WHERE id=?";
    const updateUser = "UPDATE chessgame SET \
        whiteplayerid = ?, \
        blackplayerid = ?, \
        name = ?, \
        playerturn = ?, \
        a1 = ?, \
        b1 = ?, \
        c1 = ? \
        WHERE id=?";
 
    mysqlConnection.query(updateUser, game.push(id), (err, res) => {
        if (err) {
            console.log("DB UPDATE ONE failed");
            console.log(err.message);
            return callback(err, null);
        }
        console.log("DB UPDATE ONE succeed");
        console.log(res);
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
    