var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var path = require('path')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 26664);


app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
  res.render('home');
});

app.get('/interest-rates',function(req,res){
  res.render('interest-rates');
});

app.get('/tvm-calculator',function(req,res){
  res.render('tvm-calculator');
});

app.get('/unit-converter-test',function(req,res){
  res.render('unit-converter');
});

app.post('/unit-converter',function(req,res){
  let data = Number(req.body.weight);
  data = data/28.30
  data = JSON.stringify(data)
  res.sendStatus(data);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Located http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});