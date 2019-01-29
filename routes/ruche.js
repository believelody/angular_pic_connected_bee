const express = require('express');
const router = express.Router();
const Ruche = require('../models/ruche');
const Rucher = require('../models/rucher');

router.get('/ruchers/:id/ruches', async (req, res) => {
    const { id } = req.params;
    try {
        const ruches = await Ruche.findOne({rucher: id});
        console.log(ruches);

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

router.post('/ruchers/:id/ruches/nouvelle-ruche', async (req, res) => {
    const { id } = req.params;
    try {
        const rucher = await Rucher.findById(id);
        const ruche = new Ruche({
            number: rucher.ruches.length > 0 ? rucher.ruches.length + 1 : 1,
            rucher: id,
            mesures: []
        });

        await ruche.save();

        res.json({msg: `La ruche ${ruche.number} a bien été créée.`});
    } catch (error) {
        throw Error(error);
    }
});

router.delete('/ruchers/:idRucher/ruches/:idRuche', async (req, res) => {
    const ruche = await Ruche.findById(req.params.idRuche);
    if (!ruche) {
        res.status(400).json({ msg: "Désolé, cette ruche est introuvable" });
    }
    await Ruche.findOneAndUpdate({ id: req.params.idRuche }, { $set: { deleted: true } }, { new: true });
    res.json({ msg: "La ruche a bien été supprimée" });
});

module.exports = router;