const express = require('express');
const router = express.Router();

router.get("/liveness", (request, response) => {
    
    console.log("GET /liveness");

    return response.status(200).json(`Toujours Vivant`);
});

router.get("/readiness", (request, response) => {
    
    console.log("GET /readiness");

    return response.status(200).json(`Complètement Radis`);
});


module.exports = router;