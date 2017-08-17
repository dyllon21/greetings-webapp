const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.connect(mongoUrl);


  const GreetingSchema = mongoose.Schema({name : String});
  GreetingSchema.index({name : 1}, {unique : true});

  var Greeting = mongoose.model('Greeting', GreetingSchema);

return {
  Greeting
};
}
