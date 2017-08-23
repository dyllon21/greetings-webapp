const assert = require('assert');
const Models = require('../models');

describe('models should be able to', function(done) {

  var models = Models('mongodb://localhost/greetings-test');
  //
  beforeEach(function(done) {
    models.Greeting.remove({}, function(err) {
      done(err);
    })
})
  it('store names to MongoDB', function(done) {

    var greetingData = {name : 'the greet test'};
    models.Greeting.create(greetingData, function(err){

      models.Greeting.find({ name : 'the greet test'}, function(err, greetings){
        assert.equal(1, greetings.length);
        done(err);
      })
    });


  });

  it('should not allow duplicate Greetings', function(done) {
    var greetingData = {name: 'the greet test'};
    models.Greeting.create(greetingData, function(err) {
      var greetingData = {name: 'the greet test'};

      models.Greeting.create(greetingData, function(err) {
        assert.ok(err, 'Should give error for duplicated names');
        done(err);

      });

    });
  });


});
