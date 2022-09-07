module.exports = function price_plan(db) {
    let alphabet = /^[a-z A-Z]+$/

    async function setUser(personName, plan) {
        if (alphabet.test(personName) == false) {
            return;
        }

        let name = await db.oneOrNone('SELECT user_name FROM price_plan WHERE user_name =$1', [personName])
        let price = await db.oneOrNone('SELECT plan FROM price_plan WHERE plan =$1', [plan])
        if (name & price == null) {

            await db.none('INSERT INTO price_plan(user_name,price) values($1,$2)', [personName, plan])
        }
    }

    async function getSMSname() {

        let storedNames = await db.manyOrNone('SELECT user_name from price_plan WHERE plan = sms100 ;')
        return storedNames

    }

    async function namePlan() {
        let counts = await db.one('select plan(*sms100) from price_plan;')

        return counts
    }

    async function getUser(naam) {
        let telly = await db.one('SELECT plan FROM price_plan WHERE user_name=sms100', [naam])

        return telly
    }

    return {
        setUser,
        getSMSname,
        getUser,
        namePlan

    }
}