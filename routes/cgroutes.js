const logger = require('../config/logger');
const express = require('express');
const router = express.Router();

const CG = require("../model/chessgame");


// On met en place les routes
router.post("/chessgame/", (request, response) => {
    logger.debug("POST /chessgame/ requested");
    //logger.debug(request);
    logger.debug(request.body);

    //TODO whiteplayerid, blackplayerid, name,
    let game = [];
    game.push(request.body.whiteplayerid);
    game.push(request.body.blackplayerid);
    game.push(request.body.name);

    CG.saveChessGame(game,
        (err, res) => {
            if (err) return response.status(500).json(`Insertion echouée : ${err.message}`);
            return response.status(201).json(res);
        });
});


router.get("/chessgame/", (request, response) => {
    logger.debug("GET /chessgame/ requested");

    CG.findAllChessGames((err, res) => {
        if (err) return response.status(500).json(`Select all chessgame echouée : ${err.message}`);
        return response.status(200).json(res);

    });
});


router.get("/chessgame/:id", (request, response) => {
    logger.debug("GET /chessgame/:id requested");

    const id = request.params.id;

    CG.findOneChessGame(id, (err,res) =>{
        if (err) return response.status(500).json(`Select one user echouée : ${err.message}`);
        if(res.length===0) return response.status(404).json(`ID ChessGame inconnu`);
        return response.status(200).json(res);

    });
});

router.delete("/chessgame/:id", (request, response) => {
    logger.debug("DELETE /chessgame/:id requested");

    const id = request.params.id;

    CG.deleteOneChessGame(id, (err,res) =>{
        if (err) return response.status(500).json(`Delete one user echouée : ${err.message}`);
        if(res.affectedRows===0) return response.status(404).json(`ID Utilisateur inconnu`);
        return response.status(200).json(res);

    });
});

router.put("/chessgame/:id", (request, response) => {
    logger.debug(`PUT /chessgame/ ${request.params.id} requested :`);
    const id = request.params.id;
    //logger.debug(request);
    logger.debug(request.body);

    let game = [];
    game.push(request.body.whiteplayerid);
    game.push(request.body.blackplayerid);
    game.push(request.body.name);
    
    CG.updateOneChessGame(id, game,
        (err, res) => {
            if (err) return response.status(500).json(`Update echouée : ${err.message}`);
            return response.status(200).json(res);
        });
});



module.exports = router;