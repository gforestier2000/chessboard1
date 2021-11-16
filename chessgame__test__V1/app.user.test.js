const request = require("supertest");
const app = require("../chessapp");

//const request = supertest(app);
let localId = 0;

describe("POST /users", () => {

    describe("when passed with a new email", () => {
        test("should respond with a 201 status code", async () => {
            const response = await request(app).post("/users").send({
                email: "titi106@gmail.com",
                firstname: "Titi105",
                lastname: "Loiseau"
            });
            //console.log(response.body);
            localId = response.body.insertId;
            expect(response.statusCode).toBe(201);
        });
    });

});

describe("PUT /users/:id", () => {

    describe("when passed with an existing user id", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).put(`/users/${localId}`).send({
                id: localId,
                email: "titi106@gmail.com",
                firstname: "Titi107",
                lastname: "Loiseau"
            });
            //console.log(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});

describe("GET /users/:id", () => {

    describe("when passed with an existing id", () => {
        test("should respond with a 202 status code", async () => {
            const response = await request(app).get(`/users/${localId}`).send();
            //console.log(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});

describe("GET /users/", () => {

    describe("when passed without id", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get(`/users/`).send();
            //console.log(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});
describe("DEL /users/:id", () => {

    describe("when passed an id of an existing user", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).delete(`/users/${localId}`).send();
            //console.log("localId : " + localId);
            //console.log(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});

// un utilisateur inconnu
describe("GET /users/:id", () => {

    describe("when passed an unknown id", () => {
        test("should respond with a 404 status code", async () => {
            const response = await request(app).get(`/users/999999`).send();
            //console.log(response.body);
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