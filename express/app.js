const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Implémentation d'un serveur express node js
const app = express();

//  Database config
const db = require('../config/keys').mongoURI;

// Routes import
const test = require('../routes/test');
const auth = require('../routes/auth');
const ruche = require('../routes/ruche');
const mesure = require('../routes/mesure');

//  Connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err))

app.use(bodyParser.json());

// Une redirection est faite vers les routes appropriées en fonction de l'url indiquée.
app.use('/.netlify/functions/app', test);
app.use('/.netlify/functions/app', auth);
app.use('/.netlify/functions/app', ruche);
app.use('/.netlify/functions/app/', mesure);

module.exports = app;
// Le module serverless permet à notre serveur d'être utilisée par notre hébergeur Netlify
module.exports.handler = serverless(app);