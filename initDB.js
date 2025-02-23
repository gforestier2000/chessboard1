const db = require('./config/dbconfig');


function dbHandler1(err, res) {
    console.log("USE chess");
    if (err) throw (err);
    console.log(res);

}
function dbHandler2(err, res) {
    console.log("SHOW TABLES");
    if (err) throw (err);
    console.log(res);

}
function dbHandler3(err, res) {
    console.log("DESCRIBE users");
    if (err) throw (err);
    console.log(res);

}
function dbHandler4(err, res) {
    console.log("CREATE TABLE `users`");
    if (err) throw (err);
    console.log(res);

}


db.getConnection().query("USE chess;", (err, res) => {
    console.log("USE chess");
    if (err) throw (err);
    db.getConnection().query("SHOW TABLES;", (err, res) => {
        console.log("SHOW TABLES;");
        if (err) throw (err);
        db.getConnection().query("DROP TABLE IF EXISTS `chessgame`;", (err, res) => {
            console.log("DROP TABLE IF EXISTS `chessgame`");
            if (err) throw (err);
            db.getConnection().query("DROP TABLE IF EXISTS users", (err, res) => {
                console.log("DROP TABLE `users`");
                if (err) throw (err);
                db.getConnection().query("CREATE TABLE `users` ( \
            `id` int NOT NULL AUTO_INCREMENT COMMENT 'id de l''utilisateur', \
            `email` varchar(250) NOT NULL COMMENT 'email de l''utilisateur', \
            `firstname` varchar(250) DEFAULT NULL COMMENT 'prénom de l''utilisateur', \
            `lastname` varchar(250) DEFAULT NULL COMMENT 'nom de l''utilisateur', \
            PRIMARY KEY (`id`), \
            UNIQUE KEY `email_UNIQUE` (`email`) \
          ) ENGINE=InnoDB AUTO_INCREMENT=1 COMMENT='Utilisateurs de l''application'; \
          ", (err, res) => {
                    console.log("CREATE TABLE `users`");
                    if (err) throw (err);

                    db.getConnection().query(" \
                CREATE TABLE `chessgame` ( \
                    `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID de la partie', \
                    `whiteplayerid` int DEFAULT NULL COMMENT 'ID du player qui joue avec les blancs',\
                    `blackplayerid` int DEFAULT NULL COMMENT 'ID du joueur qui joue avec les noirs', \
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
                    PRIMARY KEY (`id`), \
                    KEY `whiteplayer_idx` (`whiteplayerid`), \
                    KEY `blackplayer_idx` (`blackplayerid`), \
                    CONSTRAINT `blackplayer` FOREIGN KEY (`blackplayerid`) REFERENCES `users` (`id`), \
                    CONSTRAINT `whiteplayer` FOREIGN KEY (`whiteplayerid`) REFERENCES `users` (`id`) \
                  ) ENGINE=InnoDB AUTO_INCREMENT=1 COMMENT='Table enregistrant les joueurs d''une partie et la situation courante des pièces';", (err, res) => {
                        console.log("CREATE TABLE `chessgame`");
                        if (err) throw (err);
                        console.log(res);
                        process.exit(0);

                    });
                    console.log(res);
                });
                console.log(res);

            });
            console.log(res);
        });
        console.log(res);
    });
    console.log(res);

});

/*
db.getConnection().query("CREATE TABLE `users` ( \
    `id` int NOT NULL AUTO_INCREMENT COMMENT 'id de l''utilisateur', \
    `email` varchar(250) NOT NULL COMMENT 'email de l''utilisateur', \
    `firstname` varchar(250) DEFAULT NULL COMMENT 'prénom de l''utilisateur', \
    `lastname` varchar(250) DEFAULT NULL COMMENT 'nom de l''utilisateur', \
    PRIMARY KEY (`id`), \
    UNIQUE KEY `email_UNIQUE` (`email`) \
  ) ENGINE=InnoDB AUTO_INCREMENT=1 COMMENT='Utilisateurs de l''application'; \
  ", dbHandler4);
db.getConnection().query("DESCRIBE users;",dbHandler3);
*/

/*
  db.getConnection().query("SHOW TABLES;", dbHandler);
  db.getConnection().query("DESCRIBE user;", dbHandler);
  db.getConnection().query("DESCRIBE chessgame;", dbHandler);
*/
console.log("Initialisation base");





