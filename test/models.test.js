const assert = require('assert');
const Models = require('../models');

describe('models should be able to', function(done) {

  var models = Models('mongodb://localhost/the names-tests');
  //
  beforeEach(function(done) {
    models.Greeting.remove({}, function(err) {
      done(err);
    })

  })

  it('store names to MongoDB', function(done) {

    // var models = Models('mongodb://localhost/names');
    var greetingData = {
      name: 'The names-tests'
    };

    models.Greeting.create(
      greetingData,
      function(err) {
        done(err);

        models.Greeting.find({
          name: 'The names-tests'
        }, function(err, greeting) {
          assert.equal(1, greeting.length);
          done(err);
        });

      });

  });

  it('should not allow duplicate Greetings', function(done) {
    var greetingData = {
      name: 'The names-tests'
    };
    models.Greeting.create(greetingData, function(err) {
      var greetingData = {
        name: 'The names-tests'
      };
      models.Greeting.create(greetingData, function(err) {
        assert.ok(err, 'Should give error for duplicate names');
        done();

      });

    });
  });


});
