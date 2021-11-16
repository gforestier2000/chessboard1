const logger = require('./config/logger');

//require("dotenv").config();
require('dotenv').config({path: __dirname + '/.env'})
//logger.debug(process.env);
logger.debug(`${__filename} WELCOME : ${process.env.WELCOME}`);
logger.debug(`NODEHOST : ${process.env.NODEHOST}`);
logger.debug(`NODEPORT : ${process.env.NODEPORT}`);


const app = require("./chessapp");
logger.info('RIEN A DIRE');
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
      if (err) return logger.debug(`Insertion echouée : ${err.message}`);
      return logger.debug(res);
  });

  logger.info('RIEN A DIRE 222222');
  // Écoute du port

// GFO : Je ne comprends pas pourquoi j'ai du modifier ce code
// en passant de http.listen à app.listen
/*http.listen(PORT, HOSTNAME, () => {
    logger.debug(`Server running at http://${HOSTNAME}:${PORT}/`);
  });

app.listen(PORT,() => {
  logger.debug(`Server running on PORT :${PORT}/`);
});
*/
var listener = app.listen(PORT, () => {
  logger.fatal("Listening on port " + PORT);
  const {port} = listener.address();
  logger.debug(port);
  logger.fatal(listener.address());
});

// pour les sockets
// https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen
// https://socket.io/docs/v4/
