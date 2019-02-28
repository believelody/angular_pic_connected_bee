const express = require('express');
const router = express.Router();

router.get('/test', async (req, res) => {
    console.log(req.query);
    // console.log(result.data.slice(result.data.indexOf("PIC"), result.data.indexOf("PIC") + 7));
    
    // const valeur = new Test({ value: req.query.value });
    // res.json({ msg: req.query.value });
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end("reçu");
    // valeur.save().then(val => res.json({ msg: val.value }));
});

router.post('/test', (req, res) => {
    console.log(req.body);

    // const valeur = new Test({ value: req.query.value });
    res.json({ msg: req.body.value });
    // valeur.save().then(val => res.json({ msg: val.value }));
});

router.get('/', (req, res) => res.json({ msg: JSON.stringify(req.query) }));

module.exports = router;