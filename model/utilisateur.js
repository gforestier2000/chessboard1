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

function saveUser(email, firstname, lastname) {
    const insertUser = "INSERT INTO users (email, firstname, lastname) VALUES (? , ? , ?)";
    mysqlConnection.connect((err) => {
        if (err) {
            console.log("DB connection failed2");
            console.log(err);
        }
        console.log("DB connection succeed2");
        try {
            mysqlConnection.query(insertUser, [email, firstname, lastname], (err, results, fields) => {
                if (err) {
                    console.log("DB INSERT failed");
                    console.log(err.message);
                    //console.log(err.stack);
                    //throw err;
                    return;
                }
                console.log("DB INSERT succeed");
                console.log(results);
            });
        }
        catch (err) {
            console.log("dans le catch");
        }

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

module.exports.saveUser = saveUser;
/*
UPDATE table
SET colonne_1 = 'valeur 1', colonne_2 = 'valeur 2', colonne_3 = 'valeur 3'
WHERE condition

DELETE FROM `table`
WHERE condition
*/