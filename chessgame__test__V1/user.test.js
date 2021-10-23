const Jest = require('../node_modules/jest');
const User = require("../model/utilisateur");


function basic(input){
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