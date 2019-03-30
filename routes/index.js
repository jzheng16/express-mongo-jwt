const api = require('express').Router();

api.use('/users', require('./user'));

api.use((req, res) => res.status(404).end());

module.exports = api;
