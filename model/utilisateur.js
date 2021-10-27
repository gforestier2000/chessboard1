const MySQL = require('mysql');

/*console.log("utilisateur avant MySQL.createConnection");
console.log(`DB_HOST : ${process.env.DB_HOST}`);
console.log(`DB_PORT : ${process.env.DB_PORT}`);
console.log(`DB_USER : ${process.env.DB_USER}`);
console.log(`DB_PASSWORD : ${process.env.DB_PASSWORD}`);
console.log(`DB_DATABASE : ${process.env.DB_DATABASE}`);*/


const mysqlConnection = MySQL.createConnection({
    host: process.env.DB_HOST, //192.168.2.47
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

console.log("utilisateur après MySQL.createConnection");

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
            //console.log("DB INSERT failed");
            //console.log(err.message);
            return callback(err, null);
        }
        //console.log("DB INSERT succeed");
        //console.log(res);
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
