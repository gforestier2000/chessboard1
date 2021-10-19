const MySQL = require('mysql');

const mysqlConnection = MySQL.createConnection({
    host: 'localhost', //192.168.2.47
    port: '3306',
    user: 'user_appgfo',
    password: 'AppChess,2021',
    database: 'gfo'
});

/*mysqlConnection.connect((err) => {
    if (!err)
        console.log("DB connection succeed");
    else {
        console.log("DB connection failed");
        console.log(err);
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
            console.log("DB INSERT failed");
            console.log(err.message);
            return callback(err, null);
        }
        console.log("DB INSERT succeed");
        console.log(res);
        return callback(null, res);
    });
}

function findOneUser(id, callback) {
    const selectUser = "SELECT * FROM users WHERE id=?";
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

function findAllUsers(callback) {
    const selectUser = "SELECT * FROM users";

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


function deleteOneUser(id, callback) {
    const deleteUser = "DELETE FROM users WHERE id=?";
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

function updateOneUser(id,email,firstname,lastname,callback){
    const updateUser = "UPDATE users SET email = ?, firstname = ?, lastname = ?  WHERE id=?";
    mysqlConnection.query(updateUser, [email, firstname, lastname, id], (err, res) => {
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
module.exports.saveUser = saveUser;
module.exports.findOneUser = findOneUser;
module.exports.findAllUsers = findAllUsers;
module.exports.deleteOneUser = deleteOneUser;
module.exports.updateOneUser = updateOneUser;
/*
UPDATE table
SET colonne_1 = 'valeur 1', colonne_2 = 'valeur 2', colonne_3 = 'valeur 3'
WHERE condition


*/