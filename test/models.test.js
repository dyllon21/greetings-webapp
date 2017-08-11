const assert = require('assert');
const Models = require('../models');

describe('models should be able to', function(){

var models = Models('mongodb://localhost/names-tests');

    beforeEach(function(done){
      models.Greeting.remove({}, function(err) {
        done(err);
      })

});

  it ('store greetings to MongoDB', function(done){
    // var models = Models('mongodb://localhost/names');
var GreetingData = { name: 'The greeting test'};
  models.Greeting.create(GreetingData, function(err){
       done(err);

      models.Greeting.find({ name: 'The greeting test'}, function(err, greetings){
        assert.equal(1, Greetings.length);
      });



  });
})
});
