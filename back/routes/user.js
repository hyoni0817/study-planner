const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const db = require('../models');
const passport = require('passport');

router.post('/idcheck', async (req, res, next) => {
    try{
        const existingId = await db.User.findOne({
            where: {
                userId: req.body.userId,
            },
        });
        return existingId ? res.status(200).json({result: true}) : res.status(200).json({result: false});
    } catch (e) {
        console.error(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await db.User.create({
            username: req.body.username,
            userId: req.body.userId,
            password: hashedPassword,
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

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            console.error(err);
            return next(err);
        }
        if(info) {
            return res.status(401).send(info.reason);
        }

        return req.login(user, async (loginErr) => {
            try {
                if(loginErr) {
                    return next(loginErr);
                }

                const filteredUser = Object.assign({}, user.toJSON());
                delete filteredUser.password;
                
                return res.json(filteredUser);
            } catch (e) {
                console.error(e);
                return next(e);
            }
        })
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
})

module.exports = router;