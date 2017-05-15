'use strict';

var express = require('express');
var app = express();
// debugger;

 var greetedNames = {}

app.get('/greetings/:name', function (req, res) {
  if(greetedNames[req.params.name]){
    greetedNames[req.params.name]++;
  }else {
    greetedNames[req.params.name] = 1;
  }
 res.send('<h1>Hello, ' + req.params.name);
});

app.get('/greeted', function(req, res) {
 var namesGreeted = [];
 for (let name in greetedNames){
   namesGreeted.push(name);
 }
 res.send('Names greeted: ' + namesGreeted);
});

app.get('/counter/:name', function(req, res) {

  res.send( req.params.name + ' has been greeted ' + greetedNames[req.params.name] + ' times');

});



//start the server:
var server = app.listen(3000, function () {
 var host = server.address().address;
 var port = server.address().port;

 console.log('Greetings app listening at http://%s:%s', host, port);

});
//
// app.post('/api/user', function (req, res){
//   var user_id = req.body.id;
//   var token = req.body.token;
//   var geo = req.body.geo;
//
//   res.send(user_id + ' ' + token + ' ' + geo );
//
// });
// //create a route
// app.param('name', function(req, res, next, name){
//   var modified = name + '-dude';
//   req.name = modified;
//   next();
//
// });
// app.get('/products/:id', function(req, res){
//   console.log(req.params.id);
//   res.send("you sent me : " + req.params.id + "hello dude" + req.query.g);
// });
//
// app.get('/greetings', function (req, res) {
//   res.send('Hello Joe!');
//  });
//
//  app.get('/api/users/:name', function(req, res) {
//
//    var user_id = req.param('id');
//    var token = req.param('token');
//    var geo = req.param('geo');
//
//     res.send('Whats is up ' + req.name + '!');
//  });
//
// //start the server
// app.listen(port);
// console.log('Server started! At http://localhost:' + port);
//
// var server = app.listen(3000, function () {
//
//  var host = server.address().address;
//  var port = server.address().port;
//
//  console.log('Example app listening at http://%s:%s', host, port);
// });
