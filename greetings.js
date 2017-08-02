//send data to the server:
module.exports = function() {

    const greetList = [];

    const greeted = function(req, res) {
        res.render('greetings/index', {
            greetings: greetList
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


        });


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

        res.redirect('/greetings');
    }

    return {
        index,
        greeted,
        add
        // counter
    }
}
