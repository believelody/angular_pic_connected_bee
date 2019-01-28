const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email) res.status(400).json({ msg: 'Le champ Email est requis' });
    if (!password) res.status(400).json({ msg: 'Le champ Mot de passe est requis' });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: "L'utilisateur n'existe pas" });
        }

        const matching = await bcrypt.compare(password, user.password);
        if (!matching) {
            res.status(400).json({ msg: "Le mot de passe est incorrect" });
        }

        const token = jwt.sign({ userId: user.id, ...user }, 'gimepic', { expiresIn: '1h' });
        res.json({ userId: user.id, token, tokenExporation: 1 });
    } catch (error) {
        throw Error(error);
    }
});

router.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    if (!email) res.status(400).json({ msg: 'Le champ Email est requis' });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: "L'utilisateur n'existe pas" });
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
    if (!email) res.status(400).json({ msg: 'Le champ Email est requis' });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: "L'utilisteur n'existe pas" });
        }
        
        const hashPwd = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ password: user.password }, {$set: { password: hashPwd }}, { new: true });

        res.json({ msg: "Le mot de passe a été changé" });
    } catch (error) {
        throw Error(error);
    }
});

router.post('/register', async (req, res) => {
    const { email, password, poste } = req.body;
    if (!email) res.status(400).json({msg: 'Le champ Email est requis'});
    if (!password) res.status(400).json({ msg: 'Le champ Mot de passe est requis'});
    if (!poste) res.status(400).json({ msg: 'Le champ Poste est requis'});

    try {
        const userMatch = await User.findOne({email});
        if (userMatch) {
            res.status(400).json({ msg: "L'utilisateur existe déjà" });
        } else {
            const newPwd = await bcrypt.hash(password, 10);
            const user = new User({ email, password: newPwd, poste });
            await user.save();

            res.json({ msg: "L'utilisateur a été créé avec succès" });
        }
    } catch (error) {
        throw error;
    }
});

module.exports = router;