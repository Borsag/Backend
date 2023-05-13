const express = require('express');
const router = express.Router();

// * import function for router
const register = require('./register.js');
const login = require('./login.js');

const api_v1 = () => {
  /**
   * * get / route
   * info: api.example.com/v1
   * method: GET
   */
  router.get('/', (req, res) => {
    res.send('Hello world from API v1');
  });

  /**
   * * login route
   * info: api.example.com/v1/login
   * method: POST
   */
  router.post('/login', async (req, res) => {
    await login(req, res);
  });

  /**
   * * register route
   * info: api.example.com/v1/register
   * method: POST
   */
  router.post('/register', async (req, res) => {
    await register(req, res);
  });


  /**
   * * return router
   */
  return router;
}

module.exports = api_v1;