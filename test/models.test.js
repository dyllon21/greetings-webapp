const assert = require('assert');
const Models = require('../models');

describe('models should be able to', function() {

  var models = Models('mongodb://localhost/names-tests');
  //
  beforeEach(function(done) {
    models.Greeting.remove({}, function(err) {
      done(err);
    })

  })

  it('store names to MongoDB', function(done) {

    // var models = Models('mongodb://localhost/names');
    var greetingData = {
      name : 'The name test'
    };

    models.Greeting.create(
      greetingData,
      function(err) {
         done(err);

        models.Greeting.find({
            name: 'The test name'
          }, function(err, greeting) {
            assert.equal(1, greeting.length);
            done(err);
          });

        });
});
});
