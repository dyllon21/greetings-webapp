'use strict';
//configuration:
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Models = require('./models');

const models = Models('mongodb://localhost/greetings');

app.use(flash());
app.use(express.static('public'));
app.use(express.static('views'));

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

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoDB = 'mongodb://localhost/greetings-webapp';
mongoose.connect(mongoDB);

var MongoClient = require('mongodb').MongoClient,
  format = require('util').format;

var nameSchema = Schema({
  name: String,
  amount: Number
});

var sessionNames = [];
var counter;
var language;

const namesGreeted = mongoose.model('namesGreeted', nameSchema);

// const greetedNames = [];
// app.get('/greetings/add/:name', function(req, res) {
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
app.get('/', function(req, res, next) {

  namesGreeted.distinct('name', function(err, results) {
    if (sessionNames[0] !== undefined) {
      var lastName = sessionNames.length - 1;
      var namesForGreeting = sessionNames[lastName].name;
    };
    counter = results.length
    res.render('greetings/greetings', {
      amount: counter
    })
  })
})

app.post('/', function(req, res, next) {
  sessionNames.push({
    'name': req.body.greeting
  });
  var resetButton = req.body.resetButton;
  var greetBtn = req.body.greetBtn;
  var message = '';

  if (req.body.language === 'colombia') {
    message = 'Buenos Dias, '
  } else if (req.body.language === 'english') {
    message = 'Hello, '
  } else if (req.body.language === 'afrikaans') {
    message = 'Hallo, ';
  } else if (req.body.language === undefined) {
    message = 'please select a Language!'
  }

  var greeting = {
    name: req.body.greeting
  };
  if (!greeting || !greeting.name) {
    req.flash('error', 'Name Field Should Not Be Blank!')
  } else {
    models.Greeting.create(greeting, function(err, results) {
      if (err) {
        if (err.code === 11000) {
          req.flash('error', 'Name Already Exists!')
        } else {
          return next(err);
          res.redirect('/');
        }
      } else {
        req.flash('success', 'Name Successfully Added!');
      }
    });
  }

  if (greetBtn) {
    namesGreeted.findOne({
      name: req.body.greeting
    }, function(err, searchName) {
      if (err) {
        return next(err)
      } else {
        if (!searchName && (req.body.greeting !== "")) {
          var newName = new namesGreeted({
            name: req.body.greeting,
            amount: 1
          });
          newName.save(function(err, results) {
            if (err) {
              return next(err);
            }
            console.log('results', results);
          })
        } else {

          namesGreeted.update({
            name: req.body.greeting
          }, {
            $inc: {
              amount: 1
            }
          }, function(err) {
            if (err) {
              console.log('update not functioning');
            }
          });
        }
      }
    })
  } else if (resetButton) {
    namesGreeted.remove({}, function(err) {
      if (err) {
        return console.log(err);
      }
    })
  };
  var message = message + req.body.greeting;
  res.render('greetings/greetings', {
    greeting: message
  });
});

app.get('/greeted', function(req, res, next) {
  var xx;
  namesGreeted.distinct('name', function(err, results) {
    if (err) {
      return next(err);
    } else {
      res.render('greetings/greeted', {
        namesGreeted: results
      });

    }
  });
});

app.get('/counter/:name', function(req, res, next) {
  namesGreeted.findOne({
    name: req.body.name
  }, function(err, UrlName) {
    if (err) {
      return next(err);
    } else {
      if (UrlName) {
        var resultOfSearchedName = 'Hello, ' + req.body.greeting + ". You have been greeted " + req.body.amount + ' time(s).'
      } else {
        var resultOfSearchedName = "Oops!, we don't know this person!"
      }
    }
    res.render('greetings/counter', {
      resultOfSearchedName
    })

  });
});
// app.get('/greetings', greetingRoutes.index);
// app.get('/greetings/add', greetingRoutes.addScreen);
// app.post('/greetings/add/', greetingRoutes.add);
const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('web app started on port : ' + port);
});
