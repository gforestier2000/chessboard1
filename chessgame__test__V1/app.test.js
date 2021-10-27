const request = require("supertest");
const app = require("../chessapp");

//const request = supertest(app);
let localId = 0;

describe("POST /users", () => {

    describe("when passed a username and password", () => {
        test("should respond with a 201 status code", async () => {
            const response = await request(app).post("/users").send({
                email: "titi105@gmail.com",
                firstname: "Titi105",
                lastname: "Loiseau"
            });
            console.log(response.body);
            localId = response.body.insertId;
            expect(response.statusCode).toBe(201);
        });
    });

});

describe("PUT /users/:id", () => {

    describe("when passed a username and password", () => {
        test("should respond with a 201 status code", async () => {
            const response = await request(app).put(`/users/${localId}`).send({
                id: localId,
                email: "titi105@gmail.com",
                firstname: "Titi106",
                lastname: "Loiseau"
            });
            console.log(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});

describe("GET /users/:id", () => {

    describe("when passed a username and password", () => {
        test("should respond with a 201 status code", async () => {
            const response = await request(app).get(`/users/${localId}`).send();
            console.log(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});

describe("GET /users/", () => {

    describe("when passed a username and password", () => {
        test("should respond with a 201 status code", async () => {
            const response = await request(app).get(`/users/`).send();
            console.log(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});
describe("DEL /users/:id", () => {

    describe("when passed a username and password", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).delete(`/users/${localId}`).send();
            console.log("localId : " + localId);
            console.log(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});

// un utilisateur inconnu
describe("GET /users/:id", () => {

    describe("when passed a username and password", () => {
        test("should respond with a 201 status code", async () => {
            const response = await request(app).get(`/users/999999`).send();
            console.log(response.body);
            expect(response.statusCode).toBe(404);
        });
    });

});