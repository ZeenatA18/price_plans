const assert = require('assert');
const greeting = require('../price_plan.ff');
const pgp = require('pg-promise')();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://plan:plan123@localhost:5432/price_plan';

const config = {
    connectionString: DATABASE_URL 
}

const db = pgp(config);

describe("Greet function", function () {



})