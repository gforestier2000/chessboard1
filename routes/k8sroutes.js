const logger = require('../config/logger');
const express = require('express');
const router = express.Router();

router.get("/liveness", (request, response) => {
    
    logger.debug("GET /liveness");

    return response.status(200).json(`Toujours Vivant`);
});

router.get("/readiness", (request, response) => {
    
    logger.debug("GET /readiness");

    return response.status(200).json(`Complètement Radis`);
});


module.exports = router;