const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
//  Database config
const db = require('../config/keys').mongoURI;

// Routes import
const test = require('../routes/test');

//  Connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err))

app.use(bodyParser.json());
app.use('/.netlify/functions/test', test);

module.exports = app;
module.exports.handler = serverless(app);