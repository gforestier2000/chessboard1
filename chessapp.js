// pourquoi remettre l'environnement
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

// On instancie express
const express = require("express");
const app = express();



// On charge "path"
const path = require("path");

// On autorise le dossier "public"
app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require('body-parser');
// permet de gerer les inputs json (ex : postman)
app.use(express.json());
// permet de gerer les inputs à partir d'un formulaire
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
console.log("ajout des CORS");


// initialisation du model

const UserRouter = require("./routes/usroutes");
const ChessGameRouter = require("./routes/cgroutes");
const K8sRouter = require("./routes/k8sroutes");

// ajout des router
app.use("/",UserRouter);
app.use("/",ChessGameRouter);
app.use("/",K8sRouter);

module.exports = app;
