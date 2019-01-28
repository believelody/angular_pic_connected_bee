const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
//  Database config
const db = require('../config/keys').mongoURI;

// Routes import
const test = require('../routes/test');
const auth = require('../routes/auth');

//  Connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err))

app.use(bodyParser.json());
app.use('/.netlify/functions/app', test);
app.use('/.netlify/functions/app', auth);

module.exports = app;
module.exports.handler = serverless(app);