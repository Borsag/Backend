const db = require('../../../database/index.js');
const jwt = require('jsonwebtoken');

// * function to login a user
const login = async (req, res) => {
  /**
   * * strategy:
   * 1. get data from request body
   * 2. check if email and password is correct
   * 3. if email and password is correct, create token
   * 4. return token
   */

  /**
   * * data from request body
   * info: req.body
   * type: object
   */

  try {
    const { email, password } = req.body;

    /**
     * * validate user input is not empty
     * info: email, password
     * type: string
     */
    if(!(email && password)) {
      return res.status(400).send({message: 'All input is required'});
    }

    /**
     * * check if email already exists
     * info: email
     */
    const findUser = await db.User.findOne({email});
    if(!findUser) {
      return res.status(400).send({message: 'Email is not registered'});
    }

    /**
     * * check if password is correct
     * info: password
     */
    const isMatch = await bcrypt.compare(password, findUser.passwordHash);
    if(!isMatch) {
      return res.status(400).send({message: 'Password is incorrect'});
    }

    /**
     * * create token
     */
    const token = jwt.sign(
      { id: findUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    /**
     * * return token
     */
    return res.status(200).send({token});
  } catch (err) {
    console.error(err);
    return res.status(500).send({message: 'Internal server error'});
  }
}

// * export login function
module.exports = login;