'use strict';
//configuration:
const express = require('express');
const app = express();

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
// const path = require('path');

 const GreetingRoutes = require('./greetings');
 const Models = require('./models');

 const models = Models('mongodb://localhost/greetings');

 const greetingRoutes = GreetingRoutes(models);


app.use(flash());
// // app.use(express.static(path.join(__dirname, './static')));
app.use(express.static('public'));
app.use(express.static('views'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/greetings'),{
  useMongoClient: true,
};

var Schema = mongoose.Schema;

var nameSchema = Schema({
  name: String,
  amount: Number
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application json
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
app.set('view engine', 'handlebars');

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
app.get('/', function(req, res) {
  res.send('/greetings/add');
});


 app.get('/greetings', greetingRoutes.index);
 app.get('/greetings/add', greetingRoutes.addScreen);
 app.post('/greetings/add', greetingRoutes.add);

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
