const express = require('express');
const router = express.Router();

const CG = require("../model/chessgame");


// On met en place les routes
router.post("/chessgame/", (request, response) => {
    console.log("POST /chessgame/ requested");
    //console.log(request);
    console.log(request.body);

    //TODO

    CG.saveChessGame(request.body.email, request.body.firstname, request.body.lastname,
        (err, res) => {
            if (err) return response.status(500).json(`Insertion echouée : ${err.message}`);
            return response.status(201).json(res);
        });
});


router.get("/chessgame/", (request, response) => {
    console.log("GET /chessgame/ requested");

    CG.findAllChessGames((err, res) => {
        if (err) return response.status(500).json(`Select all chessgame echouée : ${err.message}`);
        return response.status(200).json(res);

    });
});


router.get("/chessgame/:id", (request, response) => {
    console.log("GET /chessgame/:id requested");

    const id = request.params.id;

    CG.findOneChessGame(id, (err,res) =>{
        if (err) return response.status(500).json(`Select one user echouée : ${err.message}`);
        if(res.length===0) return response.status(404).json(`ID ChessGame inconnu`);
        return response.status(200).json(res);

    });
});

router.delete("/chessgame/:id", (request, response) => {
    console.log("DELETE /chessgame/:id requested");

    const id = request.params.id;

    CG.deleteOneChessGame(id, (err,res) =>{
        if (err) return response.status(500).json(`Delete one user echouée : ${err.message}`);
        if(res.affectedRows===0) return response.status(404).json(`ID Utilisateur inconnu`);
        return response.status(200).json(res);

    });
});

router.put("/chessgame/:id", (request, response) => {
    console.log(`PUT /chessgame/ ${request.params.id} requested :`);
    const id = request.params.id;
    //console.log(request);
    console.log(request.body);

    CG.updateOneChessGame(request.params.id,request.body.email, request.body.firstname, request.body.lastname,
        (err, res) => {
            if (err) return response.status(500).json(`Update echouée : ${err.message}`);
            return response.status(200).json(res);
        });
});



module.exports = router;