const express = require('express');

const router = express.Router();
const db = require('../models');

router.post('/', async (req, res, next) => {
    try {
        const newUser = await db.User.create({
            username: req.body.username,
            userId: req.body.userId,
            password: req.body.password,
            nickname: req.body.nickname,
            birthYear: req.body.birthYear,
            email: req.body.email,
            terms: req.body.terms,
        });
        console.log(newUser);
        return res.status(200).json(newUser);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;