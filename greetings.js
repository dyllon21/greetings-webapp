//send data to the server:

module.exports = function() {

    const greetList = [];

    const index = function(req, res) {
        res.render('greetings/index', {
            greetings: greetList
        });
    };

    const addScreen = function(req, res) {
        res.render('greetings/greetings');
    }

    const add = function(req, res) {
        // res.send('Add a greeting');

        // var greeting = req.params.greeting;
        var greeting = req.body.greeting;


        var foundGreeting = greetList.find(function(currentGreeting) {
            return currentGreeting === greeting;
        });

        if (!greeting) {
            req.flash('error', 'name should not be blank')
        } else {
            if (!foundGreeting) {
                greetList.push(greeting);

            } else if (!foundGreeting) {
                req.flash('error',  'name successfully greeted')
            } else {
                req.flash('error', 'has already been greeted');
            }
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
