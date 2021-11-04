const logger = require('../config/logger');
const MySQL = require('mysql');

/*logger.debug("utilisateur avant MySQL.createConnection");
logger.debug(`DB_HOST : ${process.env.DB_HOST}`);
logger.debug(`DB_PORT : ${process.env.DB_PORT}`);
logger.debug(`DB_USER : ${process.env.DB_USER}`);
logger.debug(`DB_PASSWORD : ${process.env.DB_PASSWORD}`);
logger.debug(`DB_DATABASE : ${process.env.DB_DATABASE}`);*/


const mysqlConnection = MySQL.createConnection({
    host: process.env.DB_HOST, //192.168.2.47
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

function  checkDatabase(){
    const tableExist = "CREATE TABLE `users` ( \
        `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id de l''utilisateur', \
        `email` varchar(250) NOT NULL COMMENT 'email de l''utilisateur', \
        `firstname` varchar(250) DEFAULT NULL COMMENT 'pr├®nom de l''utilisateur', \
        `lastname` varchar(250) DEFAULT NULL COMMENT 'nom de l''utilisateur', \
        PRIMARY KEY (`id`), \
        UNIQUE KEY `email_UNIQUE` (`email`) \
      ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='Utilisateurs de l''application';"
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

checkDatabase();

//const mysqlConnection = require('../config/dbconfig');

logger.debug("utilisateur après MySQL.createConnection");

/*mysqlConnection.connect((err) => {
    if (!err)
        logger.debug("DB connection succeed");
    else {
        logger.debug("DB connection failed");
        logger.debug(err);
    }
});*/

class utilisateur {
    constructor(id, email, firstname, lastname) {
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}

function saveUser(email, firstname, lastname, callback) {
    const insertUser = "INSERT INTO users (email, firstname, lastname) VALUES (? , ? , ?)";
    mysqlConnection.query(insertUser, [email, firstname, lastname], (err, res) => {
        if (err) {
            //logger.debug("DB INSERT failed");
            //logger.debug(err.message);
            return callback(err, null);
        }
        //logger.debug("DB INSERT succeed");
        //logger.debug(res);
        return callback(null, res);
    });
}

function findOneUser(id, callback) {
    const selectUser = "SELECT * FROM users WHERE id=?";
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

function findAllUsers(callback) {
    const selectUser = "SELECT * FROM users";

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


function deleteOneUser(id, callback) {
    const deleteUser = "DELETE FROM users WHERE id=?";
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

function updateOneUser(id,email,firstname,lastname,callback){
    const updateUser = "UPDATE users SET email = ?, firstname = ?, lastname = ?  WHERE id=?";
    mysqlConnection.query(updateUser, [email, firstname, lastname, id], (err, res) => {
        if (err) {
            logger.debug("DB UPDATE ONE failed");
            logger.debug(err.message);
            return callback(err, null);
        }
        logger.debug("DB UPDATE ONE succeed");
        logger.debug(res);
        return callback(null, res);
    });
}
module.exports.saveUser = saveUser;
module.exports.findOneUser = findOneUser;
module.exports.findAllUsers = findAllUsers;
module.exports.deleteOneUser = deleteOneUser;
module.exports.updateOneUser = updateOneUser;
