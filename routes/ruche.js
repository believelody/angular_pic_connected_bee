const express = require('express');
const router = express.Router();
const Ruche = require('../models/ruche');
const Mesure = require('../models/mesure');

/* Voici les listes des différentes routes concernant les ruches */

// Renvoie toutes les ruches enregistrées dans la base de données
router.get('/ruches', async (req, res) => {
    try {
        const ruches = await Ruche.find();
        res.json(ruches);
    } catch (error) {
        throw Error(error);
    }
});

// Renvoie une ruche spécifique. Il faut remplacer :idRuche par un numéro. Ex: 3
router.get('/ruches/:idRuche', async (req, res) => {
    const { idRuche } = req.params;
    try {
        const ruche = await Ruche.findOne({numero: idRuche}).populate('Mesure');
        if (!ruche) {
            res.status(400).json("Désolé, cette ruche est introuvable");
        }
        console.log(ruche);
        
        res.json(ruche);
    } catch (error) {
        throw Error(error);
    }
});

// Crée une nouvelle ruche. Il faut bien spécifier la méthode en "POST" même si aucune donnée n'est passée en paramètre. Le système nomme les ruches par incrémentation du numéro.
router.post('/ruches/nouvelle-ruche', async (req, res) => {
    try {
        const ruches = await Ruche.find();
        console.log(ruches.length);
        
        const ruche = new Ruche({
            numero: ruches.length > 0 ? ruches.length + 1 : 1,
            mesures: []
        });
        await ruche.save();

        res.json({msg: `La ruche ${ruche.numero} a bien été créée.`});
    } catch (error) {
        throw Error(error);
    }
});

// Supprime la ruche. Il faut remplacer :idRuche par un numéro. Le système supprime par ricochet toutes les mesures liées à cette ruche.
router.delete('/ruches/:idRuche', async (req, res) => {
    console.log(req.params.idRuche);
    
    const ruche = await Ruche.findOne({ numero: req.params.idRuche });
    if (!ruche) {
        res.status(404).json({ msg: "Désolé, cette ruche est introuvable" });
    }
    ruche.mesures.forEach(async mesure => {
        await Mesure.findByIdAndDelete(mesure);
    });
    await Ruche.findByIdAndDelete(ruche.id);
    res.json({ msg: "La ruche a bien été supprimée" });
});

module.exports = router;