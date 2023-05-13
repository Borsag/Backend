// * import mongoose
const mongoose = require('mongoose');

// * function to create a connection
const connect = (uri) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database connected'))
  .catch(err => {
    console.log('Database connection failed. exiting now...');
    console.error(err);
    process.exit(1);
  });
}

// * export connect function
module.exports = {
  connect,
  User: require('./models/user.js'),
};