const assert = require('assert');
const planny = require('../price_plan.ff');
const pgp = require('pg-promise')();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://plan:plan123@localhost:5432/price_plan';

const config = {
    connectionString: DATABASE_URL 
}

const db = pgp(config);

describe("Price Plans", function () {

   
    it("Should return error message if price plan is not selected", function () {
        const plan = planny()

        assert.equal("Please select plan", plan.validateInputs("Joe", ""));

    })

    it("Should return error message if name is not entered", function () {
        const plan = planny()

        assert.equal("Please Enter name", plan.validateInputs("", "sms100"));

    })

})