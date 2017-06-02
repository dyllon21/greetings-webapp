//send data to the server:
module.exports = function() {

    const greetList = [];

    const greeted = function(req, res) {
        res.send('greeting/greeted', {
            namesGreeted: greetList
        });
    };

    const index = function(req, res) {
        res.render('greetings/index', {
            greetings: greetList
        });
    };

    const add = function(req, res) {
        // res.send('Add a greeting');

        var greeting = req.body.greeting;

        var foundGreeting = greetList.find(function(currentGreeting) {
            return currentGreeting === greeting;


            // if (foundGreeting === greetList[]){
            //   return true;
            // }else if (!foundGreeting === undefined) {
            //   return false;
            // }

        });
        console.log(foundGreeting);
        if (greeting === '') {
            req.flash('error', 'name should not be blank')
        } else {
            if (!foundGreeting) {
                greetList.push(greeting);
                req.flash('success', 'name successfully greeted')
            } else {
                req.flash('error', 'has already been greeted');
            }
        }

        res.redirect('/greetings');
    }

    return {
        index,
        add,
        greeted
    }
}
