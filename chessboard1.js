//require("dotenv").config();
require('dotenv').config({path: __dirname + '/.env'})
//console.log(process.env);
console.log(`WELCOME : ${process.env.WELCOME}`);
console.log(`NODEHOST : ${process.env.NODEHOST}`);
console.log(`NODEPORT : ${process.env.NODEPORT}`);
console.log(`DB_HOST : ${process.env.DB_HOST}`);
console.log(`DB_PORT : ${process.env.DB_PORT}`);
console.log(`DB_USER : ${process.env.DB_USER}`);
console.log(`DB_PASSWORD : ${process.env.DB_PASSWORD}`);
console.log(`DB_DATABASE : ${process.env.DB_DATABASE}`);

const app = require("./chessapp");

// On crée le serveur http
//const http = require("http").createServer(app);

const HOSTNAME = process.env.NODEHOST || '0.0.0.0';
const PORT = process.env.NODEPORT || 3000;

// Mise en place du serveur
//const server = http.createServer();
/*const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    //res.setHeader("Content-Type", "application/json; charset=utf-8");
    //res.end('Hello World');
    res.end('Premier server node lancé');
  });
*/
const Utilisateurs = require('./model/utilisateur');
Utilisateurs.saveUser("toto@gmail.com", "toto", "Ducobu",
  (err, res) => {
      if (err) return console.log(`Insertion echouée : ${err.message}`);
      return console.log(res);
  });
// Écoute du port

// GFO : Je ne comprends pas pourquoi j'ai du modifier ce code
// en passant de http.listen à app.listen
/*http.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
  });

app.listen(PORT,() => {
  console.log(`Server running on PORT :${PORT}/`);
});
*/
var listener = app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
  const {port} = listener.address();
  console.log(port);
  console.log(listener.address());
});

// pour les sockets
// https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen
// https://socket.io/docs/v4/
