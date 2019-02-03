const express = require('express');
const db = require('./db/index');
const User = require('./db/models/user');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes'));


db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database up and running');
});

app.get('/', async (req, res) => {
  try {
    const user = await User.create({ email: 'joey@joey.com', password: '1234' });
    res.json(user);
  } catch (err) {
    console.error('error creating user', err);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
