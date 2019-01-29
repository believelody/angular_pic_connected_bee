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
const rucher = require('../routes/rucher');
const ruche = require('../routes/ruche');
const mesure = require('../routes/mesure');

//  Connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err))

app.use(bodyParser.json());
app.use('/.netlify/functions/app', test);
app.use('/.netlify/functions/app', auth);
app.use('/.netlify/functions/app', rucher);
app.use('/.netlify/functions/app', ruche);
app.use('/.netlify/functions/app/sms', mesure);

module.exports = app;
module.exports.handler = serverless(app);