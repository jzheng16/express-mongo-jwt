const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../db/models/user');

const saltRounds = 10;

router.post('/signup', async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    console.log(user);
    if (user.length < 1) {
      const password = await bcrypt.hash(req.body.password, saltRounds);
      console.log('hashed password?', password);
      const newUser = await User.create({ email: req.body.email, password });
      res.json(newUser);
    } else {
      res.json('Authentication failed');
    }
  } catch (err) {
    console.error('Error signing up', err);
  }
});

module.exports = router;


// This is another change;
