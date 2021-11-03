const logger = require('../config/logger');
const request = require("supertest");
const app = require("../chessapp");

//const request = supertest(app);
let localId = 0;

// creation de deux users pour tester chessgame
let playerOneId = 0;
let playerTwoId = 0;

describe("POST /users", () => {

    describe("when passed with a new email", () => {
        test("should respond with a 201 status code", async () => {
            const response = await request(app).post("/users").send({
                email: "playerOne@gmail.com",
                firstname: "Player",
                lastname: "One"
            });
            logger.debug(response.body);
            playerOneId = response.body.insertId;
            expect(response.statusCode).toBe(201);
        });
    });

});
describe("POST /users", () => {

    describe("when passed with a new email", () => {
        test("should respond with a 201 status code", async () => {
            const response = await request(app).post("/users").send({
                email: "playerTwo@gmail.com",
                firstname: "Player",
                lastname: "Two"
            });
            logger.debug(response.body);
            playerTwoId = response.body.insertId;
            expect(response.statusCode).toBe(201);
        });
    });

});

// Test chessgame
describe("POST /chessgame", () => {

    describe("when passed a new game", () => {
        test("should respond with a 201 status code", async () => {
            const response = await request(app).post("/chessgame").send({
                whiteplayerid:playerOneId, 
                blackplayerid:playerTwoId, 
                name: "Partie test 1vs2"
            });
            logger.debug(response.body);
            localId = response.body.insertId;
            expect(response.statusCode).toBe(201);
        });
    });

});

describe("GET /chessgame/:id", () => {

    describe("when passed with an existing id", () => {
        test("should respond with a 202 status code", async () => {
            const response = await request(app).get(`/chessgame/${localId}`).send();
            logger.debug(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});

describe("PUT /chessgame/:id", () => {

    describe("when passed with an existing user id", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).put(`/chessgame/${localId}`).send({
                id: localId,
                whiteplayerid:playerOneId, 
                blackplayerid:playerTwoId, 
                name: "Partie test 1vs2 - updated"
            });
            logger.debug(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});

describe("GET /chessgame/:id", () => {

    describe("when passed with an existing id", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get(`/chessgame/${localId}`).send();
            logger.debug(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});

describe("GET /chessgame/", () => {

    describe("when passed without id", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get(`/chessgame/`).send();
            logger.debug(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});
describe("DEL /chessgame/:id", () => {

    describe("when passed an id of an existing user", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).delete(`/chessgame/${localId}`).send();
            logger.debug("localId : " + localId);
            logger.debug(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});

// un utilisateur inconnu
describe("GET /chessgame/:id", () => {

    describe("when passed an unknown id", () => {
        test("should respond with a 404 status code", async () => {
            const response = await request(app).get(`/chessgame/999999`).send();
            logger.debug(response.body);
            expect(response.statusCode).toBe(404);
        });
    });

});

/*
afterAll(async () => {
    logger.fatal("afterAll(async () => {");
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});
*/