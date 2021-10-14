console.log("Hello world");
// Modules
const http = require("http");

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

// Mise en place du serveur
//const server = http.createServer();
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    //res.setHeader("Content-Type", "application/json; charset=utf-8");
    //res.end('Hello World');
    res.end('Premier server node lancé');
  });

// Écoute du port

//server.listen(PORT);
//server.on("listening", () => console.log(`Serveur actif sur le port ${PORT}`));
server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
  });