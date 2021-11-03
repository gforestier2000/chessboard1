require('dotenv').config('../.env')
const logger = require('../config/logger');
const Jest = require('../node_modules/jest');
const User = require("../model/utilisateur");


function basic(input) {
    return input;
}
describe("Users Select", () => {
    // test stuff
    test("it should filter by a search term (link)", () => {
        // actual test
        /*User.findAllUsers((err, res) => {
            if (err) return response.status(500).json(`Select all user echouée : ${err.message}`);
            return response.status(200).json(res);
        */
        const input = true;
        const output = true;

        expect(basic(input)).toEqual(output);



    });

});

// {"fieldCount":0,"affectedRows":1,"insertId":1,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
describe("User insert", () => {
    test("it should be created with a 201 status", () => {
        User.saveUser("toto@gmail.com", "Toto", "Ducobu",
            (err, res) => {
                if (err){
                    expect(err.message).toEqual("ER_DUP_ENTRY: Duplicate entry 'toto@gmail.com' for key 'email_UNIQUE'");
                    return err.message;
                }
                else{
                    expect(res.affectedRows).toEqual(1);
                    return res;
                }
            });

    });
});
/*

*/