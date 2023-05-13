// * import packages
const express = require('express');
const app = express();
const Pusher = require('pusher');
const db = require('./database/index.js');

// * setup dotenv config to get environment variables
require('dotenv').config();

// * create connection to database
db.connect(process.env.MONGO_URI);

// * setup pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret:process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true
});

// * function for running server
const runServer = (port) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

  /**
   * * import routes from routes/api/v1/index.js
   * info: api.example.com/v1
   */
  app.use('/v1', require('./routes/api/v1/index.js')());

  /**
   * * get / route
   * info: api.example.com
   */
  app.get('/', (req, res) => {
    res.send({message: 'Hello world from API'});
  });

  /**
   * * run server
   */
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

runServer(3000);