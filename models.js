const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.connect(mongoUrl);

  var Greeting = mongoose.model('Greeting', { name: String });

return {
  Greeting
};
}
