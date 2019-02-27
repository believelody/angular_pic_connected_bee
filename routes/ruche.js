const express = require('express');
const router = express.Router();
const Ruche = require('../models/ruche');
const Rucher = require('../models/rucher');

router.get('/ruchers/:id/ruches', async (req, res) => {
    const { id } = req.params;
    try {
        const rucher = await Rucher.findById(id).populate('Ruche');
        console.log(rucher.ruches);

        res.json(rucher.ruches);
    } catch (error) {
        throw Error(error);
    }
});

router.get('/ruches', async (req, res) => {
    try {
        const ruches = await Ruche.find();
        res.json(ruches);
    } catch (error) {
        throw Error(error);
    }
});

router.get('/ruchers/:idRucher/ruches/:idRuche', async (req, res) => {
    const { idRuche } = req.params;
    try {
        const ruche = await Ruche.findById(idRuche).populate('Mesure');
        if (!ruche) {
            res.status(400).json("Désolé, cette ruche est introuvable");
        }
        console.log(ruche);
        
        res.json(ruche);
    } catch (error) {
        throw Error(error);
    }
});

router.post('/ruchers/:id/nouvelle-ruche', async (req, res) => {
    const { id } = req.params;
    try {
        const rucher = await Rucher.findById(id);
        console.log(rucher.ruches);
        
        const ruche = new Ruche({
            numero: rucher.ruches.length > 0 ? rucher.ruches.length + 1 : 1,
            rucher: id,
            mesures: []
        });
        rucher.ruches.push(ruche);
        await rucher.save();
        await ruche.save();

        res.json({msg: `La ruche ${ruche.numero} a bien été créée.`});
    } catch (error) {
        throw Error(error);
    }
});

router.delete('/ruchers/:idRucher/ruches/:idRuche', async (req, res) => {
    console.log(req.params.idRuche);
    
    const ruche = await Ruche.findById(req.params.idRuche);
    if (!ruche) {
        res.status(404).json({ msg: "Désolé, cette ruche est introuvable" });
    }
    await Ruche.findByIdAndDelete(ruche.id);
    res.json({ msg: "La ruche a bien été supprimée" });
});

module.exports = router;