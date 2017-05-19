//send data to the server:

module.exports = function(){

   const greetList = [];

  const index = function(req, res){
    res.render('greetings/index', {greetings: greetList});
    };

    const addScreen = function(req, res){
      res.render('greetings/greetings');
    }

  const add = function(req, res){
    // res.send('Add a greeting');

    // var greeting = req.params.greeting;
    var greeting = req.body.greeting;


  var foundGreeting = greetList.find(function(currentGreeting){
      return currentGreeting === greeting;
    });

    if (greeting && !foundGreeting){
      greetList.push(greeting);

    }


    res.redirect('/greetings');
  }

  return {
    index,
    add,
    addScreen
}
}

//     var name = req.query.name;
//
//     var foundName = nameList.find(function(currentName){
//       return currentName === name;
//     });
//
//     if (!foundName){
//       greetList.push(name);
//     }
//
//     res.redirect('/names');
//   }
// }
