const express = require('express');
const router = express.Router();

const Utilisateurs = require("../model/utilisateur");



// route select all
// On met en place les routes
router.post("/users/", (request, response) => {
    console.log("POST /users/ requested");
    //console.log(request);
    console.log(request.body);

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
    console.log("GET /users/ requested");

    Utilisateurs.findAllUsers((err, res) => {
        if (err) return response.status(500).json(`Select all user echouée : ${err.message}`);
        return response.status(200).json(res);

    });


    /*
    const selectUser = "SELECT * FROM users";
  
    mysqlConnection.query(selectUser, (err, res) => {
        if (err) {
            console.log("DB SELECT ALL failed");
            console.log(err.message);
            //console.log(err.stack);
            //throw err;
            return err.message;
        }
        console.log("DB SELECT ALL succeed");
        //console.log(res);
        console.log(res.length);
        response.status(200).json(res);
        return ;
    });*/
});


router.get("/users/:id", (request, response) => {
    console.log("GET /users/:id requested");

    const id = request.params.id;

    Utilisateurs.findOneUser(id, (err,res) =>{
        if (err) return response.status(500).json(`Select one user echouée : ${err.message}`);
        if(res.length===0) return response.status(404).json(`ID Utilisateur inconnu`);
        return response.status(200).json(res);

    });
    /*const selectUser = "SELECT * FROM users WHERE id=?";

    mysqlConnection.query(selectUser, [id], (err, res) => {
        if (err) {
            console.log("DB SELECT ONE failed");
            console.log(err);
            return response.status(500).json(err.message);
        }
        console.log("DB SELECT ONE succeed");
        //console.log(res);
        //console.log(res.insertId);
        //console.log(res.length);

        if (res.length === 0) return response.status(404).json("Utilisateur inconnu");

        return response.status(200).json(res);;
    });*/
});

router.delete("/users/:id", (request, response) => {
    console.log("DELETE /users/:id requested");

    const id = request.params.id;

    Utilisateurs.deleteOneUser(id, (err,res) =>{
        if (err) return response.status(500).json(`Delete one user echouée : ${err.message}`);
        if(res.affectedRows===0) return response.status(404).json(`ID Utilisateur inconnu`);
        return response.status(200).json(res);

    });
});

router.put("/users/:id", (request, response) => {
    console.log(`PUT /users/ ${request.params.id} requested :`);
    const id = request.params.id;
    //console.log(request);
    console.log(request.body);

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