const logger = require('./config/logger');

// pourquoi remettre l'environnement
require('dotenv').config({path: __dirname + '/.env'})
//logger.debug(process.env);
logger.debug(`WELCOME : ${process.env.WELCOME}`);
logger.debug(`DB_HOST : ${process.env.DB_HOST}`);
logger.debug(`DB_PORT : ${process.env.DB_PORT}`);
logger.debug(`DB_USER : ${process.env.DB_USER}`);
logger.debug(`DB_PASSWORD : ${process.env.DB_PASSWORD}`);
logger.debug(`DB_DATABASE : ${process.env.DB_DATABASE}`);

// On instancie express
const express = require("express");
const app = express();

// ==================== début logger
// on instancie le loggger
//import expressPinoLogger from "express-pino-logger";
const expressPinoLogger = require('express-pino-logger');
// import the logger
//import logger from "./logger.js";

// create an instance of the middleware
const eplMiddleware = expressPinoLogger({
  // specify the logger
  logger: logger,
  // level to log
  useLevel: "http"
});

// apply the middleware
app.use(eplMiddleware);


logger.http("HTTP : log test");
logger.debug("DEBUG : log test");
logger.info("INFO : log test");
logger.warn("WARN : log test");
logger.error("ERROR : log test");
logger.fatal("FATAL : log test");

// ==================== fin logger

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
logger.debug("ajout des CORS");


// initialisation du model

const UserRouter = require("./routes/usroutes");
const ChessGameRouter = require("./routes/cgroutes");
const K8sRouter = require("./routes/k8sroutes");

// ajout des router
app.use("/",UserRouter);
app.use("/",ChessGameRouter);
app.use("/",K8sRouter);


module.exports = app;
