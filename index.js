'use strict';

 const express = require('express');
 const exphbs = require('express-handlebars');
 const bodyParser = require('body-parser');


 var GreetingRoutes = require('./greetings');

var greetingRoutes = GreetingRoutes();

 var app = express();

 app.engine('handlebars', exphbs({defaultLayout: 'main'}));
 app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  res.send('letsGreet');
});

app.use(express.static('public'))
app.use(express.static('views'))

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false }))
//parse application json
app.use(bodyParser.json())



app.get('/greetings', greetingRoutes.index);
app.get('/greetings/add', greetingRoutes.addScreen);
app.post('/greetings/add', greetingRoutes.add);



const port = 3000;

app.listen(port, function(){
  console.log('web app started on port : ' + port);
});

// var bodyParser = require('body-parser');
// var express_handlebars = require('express-handlebars');
// // var app = expess();
// var port = process.env.PORT || 8080;
//
// //
//  app.use(bodyParser.urlencoded({
//      extended: false
//  }));
//
// app.use(bodyParser.json());
// app.use(express.static('public'))
// app.use(express.static('views'))
//
// app.engine('handlebars', express_handlebars({
//     defaultLayout: 'main'
// }));
// app.set('view engine', 'handlebars');
//
//
//
// var greetedNames = {}
//
// app.param('name', function(req, res, next, name) {
//     var modified = name + '-dude';
//     req.name = modified;
//
//     next();
// });
//
// //routes here:
// app.get('/greetings/:name', function(req, res) {
//     if (greetedNames[req.params.name]) {
//         greetedNames[req.params.name]++;
//     } else {
//         greetedNames[req.params.name] = 1;
//     }
//     res.send('<h1>Hello, ' + req.params.name);
// });
//
// app.get('/greeted', function(req, res) {
//     var namesGreeted = [];
//     for (let name in greetedNames) {
//         namesGreeted.push(name);
//     }
//     res.send('Names greeted: ' + namesGreeted);
// });
//
// app.get('/counter/:name', function(req, res) {
//
//     res.send(req.params.name + ' has been greeted ' + greetedNames[req.params.name] + ' times');
//
// });
// app.get('/api/users/:name', function(req, res) {
//     var user_id = req.param('id');
//     var token = req.param('token');
//     var geo = req.param('geo');
//
//     res.send('What is up ' + req.name + '!');
// });
// //POST http://localhost:8080/api/users
// app.post('/api/users', function(req, res) {
//     var user_id = req.body.id;
//     var token = req.body.token;
//     var geo = req.body.geo;
//
//     res.send(user_id + ' ' + token + ' ' + geo);
//
// });
//
//
// //routes with params:
// // req.get('/urls/:param_one/url_part2/:param_two', function(req, res){
// app.get('/products/:name', function(req, res) {
//     console.log(req.params.id);
//     res.send("hello : " + req.params.name);
// });
//
//
// //start the server:
// app.listen(port);
// console.log('Server started! At http://localhost:' + port);
//
// var server = app.listen(3000, function() {
//     var host = server.address().address;
//     var port = server.address().port;
//
//     console.log('Greetings app listening at http://%s:%s', host, port);
//
// });
