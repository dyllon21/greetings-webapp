//send data to the server:
module.exports = function() {

  const greetList = [];

  const greetings = function(req, res) {
    var counter = req.body.counter;
    if (counter >= 0){
      ++counter;
    }else{
      counter = 0;
    }
    res.render('greetings/index', {count: counter});
      greetings: greetList
 };
  const greeted = function(req, res) {
    res.render('greetings/index', {
      greeted: greetList
    });
  };

  const index = function(req, res) {
    res.render('greetings', {
      greetings: greetList
    });
  };
  const add = function(req, res) {

    var greeting = req.body.greeting;
      var foundGreeting = greetList.find(function(currentGreeting) {
      return currentGreeting === greeting;    });

    // flash messages
    console.log(foundGreeting);
    if (greeting === '') {
      req.flash('error', 'please confirm your name!')
    } else {
      if (!foundGreeting) {
        greetList.push(greeting);
        req.flash('success', 'name successfully greeted!')
      } else {
        req.flash('error', 'this person has already been greeted');
      }
    }
    const language = req.body.language;
    const firstName = req.body.greeting;

    console.log('language: ' + language);
    if (language === 'colombia') {
      res.render('greetings/index', {
        lang: 'Buenos Dias, ',
        name: firstName
      });
    } else if (language === 'english') {
      res.render('greetings/index', {
        lang: 'Hello, ',
        name:  firstName
      });
    } else if (language === 'afrikaans') {
      res.render('greetings/index', {
        lang: 'Hallo, ',
        name:  firstName
      });
    } else {
      res.render('greetings/index', {
        message: 'Please select a language!'
      });
    }
    // app.get('/greetings/:name', function(req, res) {
    //     if (greetedNames[req.params.name]) {
    //         greetedNames[req.params.name]++;
    //     } else {
    //         greetedNames[req.params.name] = 1;
    //     }
    //     res.send('<h1>hello, ' + req.params.name);
    // });
    //routes here:
    // app.use((req, res, next) => {
    //   req.message = 'this message made it';
    //   // console.log('one');
    //   next();
    // });
    //
    // app.use((req, res, next) => {
    //   console.log(req.message);    // app.get('/greetings/:name', function(req, res) {
    //   next();
    // });
    // app.get('/', function(req, res, next) {
    //     greetedNames:(req.body.name, function(err, results) {
    //         if (sessionNames[0] !== undefined) {
    //             var name = sessionNames.length - 1;
    //             var nameForGreet = sessionNames[req.body.name].name;
    //         };
    //         counter = results.length
    //         if (nameForGreet == undefined || nameForGreet == "") {
    //             language = "";
    //             nameForGreet = "";
    //         } else {
    //             if (err) {
    //                 return next(err)
    //             } else {
    //             }
    //         }
    //         res.render('greetings', {
    //           greetings: language + greetList,
    //           // amount: results.length,
    //         });
    //     });
    // });
    //
    // app.post('/', function(req, res, next) {
    //     sessionNames.push({
    //         name: req.body.name
    //       });
    //
    //  // const language = req.body.language;
    //
    // if (req.body.language == "Colombia") {
    //         language = "Buenos Dias, "
    //     } else if (req.body.language == "English") {
    //         language = "Hello, "
    //     } else if (req.body.language == "Afrikaans") {
    //         language = "Goeie Dag, "
    //     } else if ((req.body.afrikaans && req.body.english && req.body.colombia) == undefined) {
    //         language = "Oops,select language, "
    //     }
    //
    // });
    //
    // app.get('/greeted', function(req, res) {
    //     var namesGreeted = [];
    //     for (let name in greetedNames) {
    //         namesGreeted.push('<a href="/counter/' + name + '">' + name + '</a><br />');
    //     }
    //     res.render('greeted', {
    //         namesGreeted : {namesGreeted}
    //     });
    //     //  res.render('Names greeted: ' + namesGreeted);
    // });
    //
    // app.get('/counter/:name', function(req, res) {
    //
    //     res.render(req.params.name + ' has been greeted ' + greetedNames[req.params.name] + ' times');
    //
    // });
    //
    // const add = function(req, res) {
    //     // res.send('Add a greeting');
    //
    //     var greeting = req.body.greeting;
    //
    //     var foundGreeting = greetList.find(function(currentGreeting) {
    //         return currentGreeting === greeting;
    //
    //
    //     });
  }

  return {
    index,
    add,
    greeted,
    greetings
    // counter
  }
}
