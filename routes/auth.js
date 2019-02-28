const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Route d'authentification. Il faut envoyer l'email et le mot de passe
router.post('/login', async (req, res) => {    
    const { email, password } = req.body;
    if (!email) res.json({ success: false, code: 'email', msg: 'Le champ Email est requis' });
    if (!password) res.json({ success: false, code: 'password', msg: 'Le champ Mot de passe est requis' });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.json({ success: false, code: 'auth-email', msg: "L'utilisateur n'existe pas" });
        }

        // Le module bcrypt crypte le mot de passe et la fonction compare est un processus interne qui compare celle de la base de donnée à celle de la requête
        const matching = await bcrypt.compare(password, user.password);
        if (!matching) {
            res.json({ success: false, code: 'auth-password', msg: "Le mot de passe est incorrect" });
        }

        const token = jwt.sign({ userId: user.id, ...user }, 'gimepic', { expiresIn: '1d' });
        res.json({ success: true, user: { id: user.id, name: user.name, email: user.email }, token, tokenExporation: 1 });
    } catch (error) {
        throw Error(error);
    }
});

router.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    if (!email) res.status(400).json({ success: true, msg: 'Le champ Email est requis' });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success: true, msg: "L'utilisateur n'existe pas" });
        }
        
        const newPwd = "0000";
        const hashPwd = await bcrypt.hash(newPwd, 10);
        await User.findOneAndUpdate({ password: user.password }, {$set: { password: hashPwd }}, { new: true });

        res.json({ msg: "Le mot de passe a été changé" });
    } catch (error) {
        throw Error(error);
    }
});

router.post('/new-password', async (req, res) => {
    const { email, password } = req.body;
    if (!email) res.status(400).json({ success: true, msg: 'Le champ Email est requis' });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success: true, msg: "L'utilisteur n'existe pas" });
        }
        
        const hashPwd = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ password: user.password }, {$set: { password: hashPwd }}, { new: true });

        res.json({ success: true, msg: "Le mot de passe a été changé" });
    } catch (error) {
        throw Error(error);
    }
});

// Même si l'application n'a pas d'interface pour créer un nouvel utilisateur, une route côté serveur est prévue pour. Il faut juste un formulaire comprenant obligatoirement une variable 'name' représentant le nom, une variable 'email', une variable 'password' et une variable 'poste'
router.post('/register', async (req, res) => {
    const { name, email, password, poste } = req.body;
    if (!name) res.json({ success: false, msg: 'Le champ Nom est requis'});
    if (!email) res.json({ success: false, msg: 'Le champ Email est requis'});
    if (!password) res.json({ success: false, msg: 'Le champ Mot de passe est requis'});
    if (!poste) res.json({ success: false, msg: 'Le champ Poste est requis'});

    try {
        const userMatch = await User.findOne({email});
        if (userMatch) {
            res.json({ success: false, msg: "L'utilisateur existe déjà" });
        } else {
            const newPwd = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: newPwd, poste });
            await user.save();

            res.json({ msg: "L'utilisateur a été créé avec succès" });
        }
    } catch (error) {
        throw error;
    }
});

module.exports = router;