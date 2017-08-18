//send data to the server:
module.exports = function(models) {

  const greetList = [];
  var counter = 0;

  const index = function(req, res, next) {

    models.Greeting.find({}, function(err, greetings){
      if (err) {
        return next(err);
      }
      res.render('greetings/index', {greetings});
    });
  };

  const addScreen = function(req, res) {
    res.render('greetings/add');
  };



  const add = function(req, res, next) {


    // res.send('Add a greetingMsg');
    var greeting = {
      name : req.body.greeting
    };

    // var foundGreeting = greetList.find(function(currentGreeting) {
    //   return currentGreeting === greeting;
    // });

    // flash messages
    if(!greeting || !greeting.name){
        req.flash('error', "There's no name entered!");
    }else{
      models.Greeting.create(greeting, function(err, results){
        if (err){
          return next(err);
        }
        req.flash('success', 'successfully greeted')
      });
    }
  //   if (!greeting || !greeting.name) {
  // } else if(greeting === greeting.name) {
  //    res.redirect('/greetings/add');
  //         }
  //        else {
  //         models.Greeting.create(greeting, function(err, results) {
  //           if (err) {
  //             if (err.code === 11000) {
  //               return next(err);
  //               req.flash('error', 'please confirm your name')
  //       }
  //       }
  //     });
  //   }

const language = req.body.language;
const firstName = req.body.greeting;

if (language !== undefined || language) {

  if (language === 'colombia') {
    counter++
    var lang = 'Buenos Dias, ';
    var name = firstName;

  } else if (language === 'english') {
    counter++
    var lang = 'Hello, ';
    var name = firstName;

  } else if (language === 'afrikaans') {
    counter++
    var lang = 'Hallo, ';
    var name = firstName;
  }

  var data = {
    lang: lang,
    name: name,
    counter: counter
  }
  res.render('greetings/add', data)

} else {
  res.render('greetings/add', {
    message: 'Please select a language!'
  });
  res.redirect('/greetings/add');
}
}
return {
  index,
  add,
  addScreen
}
};

//
// models.Greeting.find({}, function(err, greetings) {
//   if (err) {
//     return next(err);
//   }
//   res.render('greetings/add', {
//     greetings
//   });
//
// });


// const greetedNames = [];
// const greeted = function(req, res) {
//
//   var greeted = {
//     name: req.body.greeted
//   };
//
//   if (!greeted || !greeted.name) {
//     greetedNames.push('<a href="/counter ' + name + '">' + name + '</a><br />');
//
//   } else if (greeted === greeting.name) {
//     var greeted = greeting;
//   } else {
//     return greeted
//   }
//
//   res.render('greetings/index', {
//     greeted: greetedNames
//
//   });
// };
//
