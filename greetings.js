//send data to the server:
module.exports = function(models) {

  const greetList = [];

  const index = function(req, res, next) {

    models.Greeting.find({}, function(err, greetings) {
      if (err) {
        return next(err)
      }
      res.render('greetings/index', {
        greetings
      });

    });


  };




  const add = function(req, res, next) {

    var greeting = {
      name: req.body.greeting
    };


    //  var foundGreeting = greetList.find(function(currentGreeting) {
    //   return currentGreeting === greeting;
    // });

    // flash messages
    if (!greeting || !greeting.name) {
      req.flash('error', 'please confirm your name!')
    } else {

      models.Greeting.create(greeting, function(err, results) {
        if (err) {
          return next(err)
        }
        req.flash('success', 'successfully greeted and added!')
      })
      // if(!foundGreeting){
      //   greetList.push(greeting);
      // }else {
      //   req.flash('error', 'name already stored in DB!');
      // }
    }

    const language = req.body.language;
    const firstName = req.body.greeting;

    if (language !== undefined || language) {

      if (language === 'colombia') {
        var lang = 'Buenos Dias, '
        var name = firstName;

      } else if (language === 'english') {
        var lang = 'Hello, ';
        var name = firstName;
      } else if (language === 'afrikaans') {
        var lang = 'Hallo, ';
        var name = firstName;
      }

      var data = {
        lang: lang,
        name: name,
        counter: greetList.length
      }
      res.render('greetings/index', data)



    } else {
      res.render('greetings/index', {
        message: 'Please select a language!'
      });
    }
  }

  return {
    add,
    // greeted
    index
  };

}
