'use strict';
//configuration:
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const Models = require('./models');

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/greetings";
const models = Models(mongoURL);

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
  },
  resave: true,
  saveUninitialized: true
}));
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//var MongoClient = require('mongodb').MongoClient,
var format = require('util').format;

var sessionNames = [];
var counter;
var language;

const NamesGreeted = models.Greeting;

app.get('/', function(req, res, next) {

  NamesGreeted.distinct('name', function(err, results) {
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

  if (req.body.language === 'colombia' ) {
    message = 'Buenos Dias, '
  } else if (req.body.language === 'english') {
    message = 'Hello, '
  } else if (req.body.language === 'afrikaans') {
    message = 'Hallo, ';
  } else if (req.body.language === undefined && greetBtn) {
    message = 'please select a Language!'
  }

  var greeting = {
    name: req.body.greeting
  };
  if (!greeting || !greeting.name && greetBtn) {
    req.flash('error', 'Name Field Should Not Be Blank!')
  }

  if (greetBtn) {
    NamesGreeted.findOne({
      name: req.body.greeting
    }, function(err, searchName) {
      if (err) {
        return next(err)
      } else {
        if (!searchName && (req.body.greeting !== "")) {
          var newName = new NamesGreeted({
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

          NamesGreeted.update({
            name: req.body.greeting
          }, {
            $inc: {
              amount: 1
            }
          }, function(err) {
            if (err) {}
          });
        }
      }
    })
  } else if (resetButton) {
    NamesGreeted.remove({}, function(err) {
      if (err) {
        return next(err);
      }
      // return console.log(err);
    })
  };
  var message = message + req.body.greeting;
  res.render('greetings/greetings', {
    greeting: message
  });
});

app.get('/greeted', function(req, res, next) {
  var xx;
  NamesGreeted.distinct('name', function(err, results) {
    if (err) {
      return next(err);
    } else {
      res.render('greetings/greeted', {
        NamesGreeted: results
      });

    }
  });
});

app.get('/counter/:name', function(req, res, next) {
  NamesGreeted.findOne({
    name: req.params.name
  }, function(err, greeting) {
    if (err) {
      return next(err);
    } else {
      if (greeting) {
        var resultOfSearchedName = 'Hi, ' + greeting.name + ". You have been greeted " + greeting.amount + ' time(s).'
      } else {
        var resultOfSearchedName = "Oops!, we don't know this person!"
      }
    }
    res.render('greetings/counter', {
      resultOfSearchedName
    })

  });
});

const port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log('web app started on port : ' + port);
});
