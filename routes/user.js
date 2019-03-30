const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const User = require('../db/models/user');
const checkToken = require('../jwt-middleware');

const saltRounds = 10;

router.post('/signup', async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });

    // User will either be an empty array (not found) or an array with info
    if (user.length < 1) {
      const password = await bcrypt.hash(req.body.password, saltRounds);
      console.log('hashed password?', password);
      const newUser = await User.create({ email: req.body.email, password });
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        jwtSecret,
        {
          expiresIn: '24h' // expires in 24 hours
        }
      );
      res.json({
        email: newUser.email,
        token
      });
    } else {
      res.json('This email already exists, please use another one.');
    }
  } catch (err) {
    console.error('Error signing up', err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.find(req.body);
    if (!user) {
      res.json('Wrong email and/or password');
    }
    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret);
    res.json({
      user,
      token
    });
  } catch (err) {
    console.error('err logging in user', err);
  }
});

router.post('/changeinfo', checkToken, async (req, res) => {
  res.json(req.decoded);
});

module.exports = router;
