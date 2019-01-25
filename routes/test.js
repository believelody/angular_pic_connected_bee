const express = require('express');
const Test = require('../models/test');
const router = express.Router();

router.get('/test', (req, res) => {
    console.log(req);

    const valeur = new Test({ value: req.query.value });
    res.json(req);
    // valeur.save().then(val => res.json(req));
});

router.post('/envoi', (req, res) => {
    console.log(req.body);

    const valeur = new Test({ value: req.body.value });

    valeur.save().then(val => res.json(val));
});

router.get('/', (req, res) => res.json({ msg: 'yes we can' }));

module.exports = router;