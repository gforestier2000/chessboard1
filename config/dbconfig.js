// check env variable
require('dotenv').config('../.env');

const MySQL = require('mysql');

let mysqlConnection;

function getConnection(){
     return mysqlConnection = MySQL.createConnection({
        host: process.env.DB_HOST, //192.168.2.47
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
}

function databaseIsReady(){
    let connection = getConnection();
    connection.query('USE chess; SHOW TABLES', (err,res)=>{
        if(err){
            console.log(err);
            return false;
        }
        console.log(res);
        return true;
    });
}

module.exports.getConnection = getConnection;
module.exports.databaseIsReady = databaseIsReady;