const logger = require('../config/logger');
const express = require('express');
const router = express.Router();

const Utilisateurs = require("../model/utilisateur");



// route select all
// On met en place les routes
router.post("/users/", (request, response) => {
    logger.debug("POST /users/ requested");
    //logger.debug(request);
    logger.debug(request.body);

    Utilisateurs.saveUser(request.body.email, request.body.firstname, request.body.lastname,
        (err, res) => {
            if (err) return response.status(500).json(`Insertion echouée : ${err.message}`);
            return response.status(201).json(res);
        });
    /*const msg = {
      message : "tout va bien",
      id2 : 1234,
      id : request.body.id
    };
  
    response.status(201).json(msg);
    //response.status(201).json("tout est ok");*/
});


router.get("/users/", (request, response) => {
    logger.debug("GET /users/ requested");

    Utilisateurs.findAllUsers((err, res) => {
        if (err) return response.status(500).json(`Select all user echouée : ${err.message}`);
        return response.status(200).json(res);

    });


    /*
    const selectUser = "SELECT * FROM users";
  
    mysqlConnection.query(selectUser, (err, res) => {
        if (err) {
            logger.debug("DB SELECT ALL failed");
            logger.debug(err.message);
            //logger.debug(err.stack);
            //throw err;
            return err.message;
        }
        logger.debug("DB SELECT ALL succeed");
        //logger.debug(res);
        logger.debug(res.length);
        response.status(200).json(res);
        return ;
    });*/
});


router.get("/users/:id", (request, response) => {
    logger.debug("GET /users/:id requested");

    const id = request.params.id;

    Utilisateurs.findOneUser(id, (err,res) =>{
        if (err) return response.status(500).json(`Select one user echouée : ${err.message}`);
        if(res.length===0) return response.status(404).json(`ID Utilisateur inconnu`);
        return response.status(200).json(res);

    });
    /*const selectUser = "SELECT * FROM users WHERE id=?";

    mysqlConnection.query(selectUser, [id], (err, res) => {
        if (err) {
            logger.debug("DB SELECT ONE failed");
            logger.debug(err);
            return response.status(500).json(err.message);
        }
        logger.debug("DB SELECT ONE succeed");
        //logger.debug(res);
        //logger.debug(res.insertId);
        //logger.debug(res.length);

        if (res.length === 0) return response.status(404).json("Utilisateur inconnu");

        return response.status(200).json(res);;
    });*/
});

router.delete("/users/:id", (request, response) => {
    logger.debug("DELETE /users/:id requested");

    const id = request.params.id;
    Utilisateurs.deleteOneUser(id, (err,res) =>{
        if (err) return response.status(500).json(`Delete one user echouée : ${err.message}`);
        if(res.affectedRows===0) return response.status(404).json(`ID Utilisateur inconnu`);
        return response.status(200).json(res);

    });
});

router.put("/users/:id", (request, response) => {
    logger.debug(`PUT /users/ ${request.params.id} requested :`);
    const id = request.params.id;
    //logger.debug(request);
    logger.debug(request.body);

    Utilisateurs.updateOneUser(request.params.id,request.body.email, request.body.firstname, request.body.lastname,
        (err, res) => {
            if (err) return response.status(500).json(`Update echouée : ${err.message}`);
            return response.status(200).json(res);
        });
    /*const msg = {
      message : "tout va bien",
      id2 : 1234,
      id : request.body.id
    };
  
    response.status(201).json(msg);
    //response.status(201).json("tout est ok");*/
});



module.exports = router;