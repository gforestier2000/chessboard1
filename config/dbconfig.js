const MySQL = require('mysql');

function mysqlConnection() {
    return MySQL.createConnection({
        host: 'localhost', //192.168.2.47
        port: '3306',
        user: 'user_appgfo',
        password: 'AppChess,2021',
        database: 'gfo'
    });
}

module.exports.mysqlConnection = mysqlConnection;