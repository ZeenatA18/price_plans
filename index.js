const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const app = express();

const price_plan = require('./price_plan.ff');
// const routes = require('./routes/routes')
const pgp = require('pg-promise')();

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://plan:plan123@localhost:5432/price_plan';



const config = { 
	connectionString : DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = pgp(config);

const planning = price_plan(db)
// const planRoutes = routes(greets)

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    secret: "This is my long String that is used for session",
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash());

app.get('/', function (req, res) {

    res.render('index', {


    });
})

app.post('/',async function (req, res) {
    let name = req.body.user_name
    
    let plan = req.body.plan

    if(name & plan){
        req.flash('error', 'accepted')
    }

    res.redirect('/')
})

app.get('/calc_bill', function (req, res) {

    res.render('calc_bill', {
        
    })
   
})

app.get('/price_plans', function (req, res) {
    
    
    res.render('price_plans', {
        
    })
    
})






const PORT = process.env.PORT || 3020;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})