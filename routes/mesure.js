const express = require('express');
const router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const Mesure = require('../models/mesure');
const Ruche = require('../models/ruche');
const Rucher = require('../models/rucher');

router.get('rucher/:numRucher/ruche/:numRuche', async (req, res) => {
    const { numRucher, numRuche } = req.params;
    const { poids, tInt, tExt } = req.query;    
    console.log(req.query);

    // try {
    //     const ruche = await Ruche.findOne({numero: numRuche, rucher: numRucher});
    //     const mesure = new Mesure({ruche, poids, tInt, tExt});
    //     await mesure.save();

    //     res.json({msg: "Nouvelle mesure enregistrée"});
    // } catch (error) {
    //     throw Error(error);
    // }
});

router.get('/sms', async (req, res) => {
    const twiml = new MessagingResponse();
    const msgBody = req.query.Body;
    // console.log(req.query.Body);

    try {
        const rucher = await Rucher.findOne({ numero: 1 });
        const ruche = await Ruche.findOne({ numero: 1, rucher: rucher.id });
        let val = msgBody.slice(msgBody.indexOf('PIC'))
        const tab = val.split(';');
        console.log(tab);
        const mesure = new Mesure({ruche: ruche.id, poids: tab[1], tInt: 0, tExt: 0});
        ruche.mesures.push(mesure);
        await ruche.save();
        await mesure.save();
        
        // res.json({msg: "Nouvelle mesure enregistrée"});
        // twiml.message(`Nouvelle mesure enregistrée`);
    
        // res.writeHead(200, {'Content-Type': 'text/xml'});
        // res.end(twiml.toString());
    } catch (error) {
        throw Error(error);
    }    
});

router.get('/envoi', async (req, res) => {

    try {
        const rucher = await Rucher.findOne({ numero: 1 });
        const ruche = await Ruche.findOne({ numero: 1, rucher: rucher.id });
        // let val = msgBody.slice(msgBody.indexOf('PIC'))
        // const tab = val.split(';');
        const poids = req.query.value;
        console.log(poids);
        const mesure = new Mesure({ ruche: ruche.id, poids, tInt: 0, tExt: 0 });
        ruche.mesures.push(mesure);
        await ruche.save();
        await mesure.save();

        res.json({msg: "Nouvelle mesure enregistrée"});
        // twiml.message(`Nouvelle mesure enregistrée`);

        // res.writeHead(200, {'Content-Type': 'text/xml'});
        // res.end(twiml.toString());
    } catch (error) {
        throw Error(error);
    }
});

router.get('/mesures', async (req, res) => {
    const { ruche } = req.query;
    try {
        const mesures = await Mesure.find({ ruche });

        res.json({ success: true, mesures});
    } catch (error) {
        throw Error(error);
    }
});

module.exports = router;