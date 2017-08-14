'use strict';
//requirements:
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// var greetName = mongoose.model('greetName', { name: string });
//
// var name = new greetName ({ name: 'Dyllon' });
// name.save(function (err) {
//   if(err) {
//     console.log(err);
//   }else {
//     console.log('meow');
//   }
// });
//
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function() {
//   //we're connected!
// });
//
// var greetListSchema = mongoose.Schema({
//   name: string
// });
//
// var greetName = mongoose.model('greetName', greetListSchema);
//
// var newPerson =  new greetName({ name: 'newGreet' });
// console.log(newGreet.name); //'newGreet'
//
// // NOTE : methods must be added tot he schema before compiling it with mongoose.model()
// greetListSchema.methods.speak = function () {
//   var greeting = this.name
//   ? "hello " + this.name
//   : "I don't have a name";
//   console.log(greeting);
// }
// var greetedNames = mongoose.model('greetedNames', greetListSchema);
//
// var newName = new greet({ name: 'newName' });
// newName.speak();//hello name is newName
//
//
// newName.save(function (err, newName) {
//   if (err) return console.error(err);
//   newName.speak();
// });
//
// greetList.find(function (err, greetedNames) {
//   if (err) return console.error(err);
//   console.log(greetedNames);
// });
//
//  greetList.find({ name: /^newName/ }, callback);


const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const path = require('path');
//configuration:
app.use(flash());
app.use(express.static(path.join(__dirname, './static')));
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'handlebars');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

//parse application json
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  }
}));
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

// var GreetingRoutes = require('./counter');
var GreetingRoutes = require('./greetings');
var greetingRoutes = GreetingRoutes();

//
// app.get('/greetings/:name', function(req, res) {
//
//     if (greetedNames[req.params.name]) {
//         greetedNames[req.params.name]++;
//     } else {
//        greetedNames.push(req.params.name)
//         greetedNames[req.params.name] = 1;
//     }
//     console.log('greetedNames',greetedNames);
//     res.send('<h1>hello, ' + req.params.name);
// });
//

app.get('/greetings/:id', function(req, res) {
  console.log(req.params.id);
  res.send("hello, " + req.params.id);
});

const greetedNames = [];
app.get('/greeted', function(req, res) {
  // const namesGreeted = [];
  for (let name in greetedNames) {
    // namesGreeted.push('<a href="/counter' + name + '">' + name + '</a><br />');
  }
  res.render('greeted', {
    namesGreeted: greetedNames

  });
});
// });
// app.get('/counter/:name', function(req, res) {
//
//   res.redirect('/greetings');
// });
//

// app.post('/counter', greetingRoutes.index);

app.get('/', function(req, res) {
  res.redirect('/greetings');
});

app.get('/greetings', greetingRoutes.add);
app.post('/greetings', greetingRoutes.add);

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('web app started on port : ' + port);
});
//
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
