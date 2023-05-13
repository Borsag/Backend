const db = require('../../../database/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// * function to register a new user
const register = async (req, res) => {
  /**
   * * strategy:
   * 1. get data from request body
   * 2. check if email already exists
   * 3. if email already exists, return error
   * 4. validate data
   * 5. if data is not valid, return error
   * 6. if data is valid, create new user
   * 7. save new user to database
   * 8. return success message
   */

  /**
   * * data from request body
   * info: req.body
   * type: object
   * example: {
   *  displayName: 'John Doe',
   *  email: 'example@gmail.com',
   *  password: 'mypassword'
   * }
   */

  try {
    const { displayName, email, password } = req.body;

    /**
     * * validate user input is not empty
     * info: displayName, email, password
     * type: string
     */
    if(!(displayName && email && password)) {
      return res.status(400).send({message: 'All input is required'});
    }

    /**
     * * check if email already exists
     * info: email
     * type: string
     */
    const getUser = await db.User.findOne({email});
    if(getUser) {
      return res.status(400).send({message: 'Email already exists'});
    }

    /**
     * * encrypt password
     * info: password
     * type: string
     * example: 'mypassword'
     * encrypted: 'sdfjksdfjksdfjksdfjksdfjksdfjksdfjksdfjksdfjksdfjksdfjk'
     */
    const encryptedPassword = await bcrypt.hash(password, 10);

    /**
     * * create new user
     * info: displayName, email, encryptedPassword
     * type: string
     */
    const newUser = new db.User({
      displayName,
      email,
      passwordHash: encryptedPassword,
    });
    /**
     * * save newUser to database
     * info: newUser
     * type: object
     */
    await newUser.save();

    /**
     * * create token using jwt
     * info: newUser
     * type: object
     */
    const token = jwt.sign({
      id: newUser._id
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // * set token to newUser variable
    newUser.token = token;


    /**
     * * return success message
     * info: newUser
     */
    return res.status(201).send({
      message: 'User created successfully',
      data: newUser
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({message: 'Internal server error'});
  }
};

// * export register function
module.exports = register;