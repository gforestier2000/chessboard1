//require("dotenv").config();
require('dotenv').config({path: __dirname + '/.env'})
//console.log(process.env);
console.log(`WELCOME : ${process.env.WELCOME}`);
console.log(`NODEHOST : ${process.env.NODEHOST}`);
console.log(`NODEPORT : ${process.env.NODEPORT}`);

// initialisation du model
const Utilisateurs = require("./model/utilisateur");

// On instancie express
const express = require("express");
const app = express();

// On charge "path"
const path = require("path");

// On autorise le dossier "public"
app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// On met en place les routes
app.post("/users/", (request, response) => {
  console.log("POST /users/ requested");
  //console.log(request);
  console.log(request.body);
  const msg = {
    message : "tout va bien",
    id2 : 1234,
    id : request.body.id
  };

  response.status(201).json(msg);
  //response.status(201).json("tout est ok");
});
app.get("/users/:id", (request, response) => {
  console.log("GET /users/:id requested");
  /*mysqlConnection.query("select * from user where id = ?", request.params.id, (err, results, fields) => {
      if (!err){
          console.log("DB request succeed");
          response.send(results);

      }
      else
          console.log("DB request failed");
          
     
  });*/
  //console.log(request);
  // c'est quoi la différence entre .status().json() et un send() ?
  response.status(200).json({id : request.params.id});
  //response.send(`<h1>bien recu : ${request.params.id}<h1>`);
});

Utilisateurs.saveUser("toto3@gmail.com","Henri", "Toto");
Utilisateurs.saveUser("toto4@gmail.com","Henri", "Toto");
Utilisateurs.saveUser("toto5@gmail.com","Henri", "Toto");

// On crée le serveur http
const http = require("http").createServer(app);

const HOSTNAME = process.env.NODEHOST || '127.0.0.1';
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
// Écoute du port

//server.listen(PORT);
//server.on("listening", () => console.log(`Serveur actif sur le port ${PORT}`));
http.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
  });