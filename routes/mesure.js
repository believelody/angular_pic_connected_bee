const express = require('express');
const router = express.Router();
// const MessagingResponse = require('twilio').twiml.MessagingResponse();
const Nexmo = require('nexmo');
const Mesure = require('../models/mesure');
const Ruche = require('../models/ruche');

router.get('rucher/:numRucher/ruche/:numRuche', async (req, res) => {
    const { numRucher, numRuche } = req.params;
    const { poids, tInt, tExt } = req.query;    
    console.log(req.query);

    try {
        const ruche = await Ruche.findOne({numero: numRuche, rucher: numRucher});
        const mesure = new Mesure({ruche, poids, tInt, tExt});
        await mesure.save();

        res.json({msg: "Nouvelle mesure enregistrée"});
    } catch (error) {
        throw Error(error);
    }
});

router.get('/webhooks/inbound-sms', async (req, res) => {
    // const twiml = new MessagingResponse();
    // const msgFrom = req.body.From;
    // const msgBody = req.body.Body;
    // console.log(req.body);
    // twiml.message(`You sent ${msgBody}`);

    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
    const params = Object.assign(request.query, request.body)
    console.log(params)
    response.status(204).send();
});

// router.post('rucher/:numRucher/ruche/:numRuche', async (req, res) => {
//     const { numRucher, numRuche } = req.params;
//     const { poids, tInt, tExt } = req.body;
//     console.log(req.body);

//     try {
//         const ruche = await Ruche.findOne({ numero: numRuche, rucher: numRucher });
//         const mesure = new Mesure({ ruche, poids, tInt, tExt });
//         await mesure.save();

//         res.json({ msg: "Nouvelle mesure enregistrée" });
//     } catch (error) {
//         throw Error(error);
//     }
// });

module.exports = router;