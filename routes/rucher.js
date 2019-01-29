const express = require('express');
const router = express.Router();
const Rucher = require('../models/rucher');

router.get('/ruchers', async (req, res) => {
    try {
        const ruchers = await Rucher.find().populate('Ruche');
        console.log(ruchers);
        
        res.json(ruchers);
    } catch (error) {
        throw Error(error);
    }
});

router.post('/nouveau-rucher', async (req, res) => {
    try {
        const ruchers = await Rucher.find();

        const { coords } = req.body;
        const rucher = new Rucher({ number: ruchers ? ruchers.length + 1 : 1, coords, ruches: [] });

        await rucher.save();

        res.json({ msg: 'Rucher bien enregistré' });
    } catch (error) {
        throw Error(error);
    }
});

router.get('/ruchers/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const rucher = await Rucher.findById(id);
        if (!rucher) {
            res.status(400).json({ msg: "Désolé nous ne trouvons pas ce rucher." });
        }
        console.log(rucher);
        
        res.json(rucher);
    } catch (error) {
       throw Error(error); 
    }
});

router.delete('/ruchers/:id', async (req, res) => {
    const rucher = await Rucher.findById(req.params.id);
    if (!rucher) {
        res.status(400).json({msg: "Désolé, ce rucher est introuvable"});
    }
    await Rucher.findOneAndUpdate({ id: req.params.id }, {$set: {deleted: true}}, {new: true});
    res.json({msg: "Le rucher a bien été supprimé"});
});

module.exports = router;