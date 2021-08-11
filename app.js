var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var path = require('path')
var cors = require('cors')
var app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 26664);


app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
  res.render('home');
});

app.get('/treasury-rates', function (req, res) {
  res.render('treasury-rates');
});

app.get('/stocks',function(req,res){
  res.render('stocks');
});

app.post('/unit-converter',function(req,res){
  const data = req.body;
  for(var i = 0; i < data.length; i++){
    data[i] = (data[i]/28.35).toFixed(2)
  }
  res.send(data);
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