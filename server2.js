'use strict';

var express = require('express');
var exhandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

//creating path to combine
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/views'));

app.use(express.static(__dirname + '/routes'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// make use of handlebars
app.engine('handlebars', exhandlebars({defaultLayout: 'main'}));
app.set('view engine', 'hanldebars');

app.get('/greetings', function(req, res) {
  res.render('home');

});
debugger;

app.post('/greetings', function(req, res){
  var userName = req.body.username;
  var nameData = {name : userName};
  res.render('home', nameData);
});
app.post('/greetings', function(req, res){
  var selectedButt = req.body.radioButt;
    $('#id').prop("checked")
    req.body.name_of_input
  });
  var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Greetings app listening at http://%s:%s', host, port);
  });
