const express = require('express');
const rp = require('request-promise');
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
const port = process.env.PORT || 4000;


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.render('home');
});

app.get('/treasury-rates', function (req, res) {
    res.render('treasury-rates');
});

app.get('/treasury-scraper', function (req, res) {
    const url = 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/all/202203?type=daily_treasury_yield_curve&field_tdr_date_value_month=202203&page&_format=csv'
    rp(url)
        .then(function (html) {
            console.log(html);
            res.send(html);
        })
        .catch(function (err) {
        })
});


app.get('/companies', function (req, res) {
    res.render('companies');
});

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(port);