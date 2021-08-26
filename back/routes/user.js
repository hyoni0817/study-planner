const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const db = require('../models');
const passport = require('passport');

const { Op } = require('sequelize');
const moment = require('moment');

router.get('/', async (req, res) => {
    if(!req.user) {
        return res.status(401).send('로그인이 필요합니다');
    }

    const todayDate = moment(moment().tz('Asia/Seoul').format('YYYY-MM-DD'), 'YYYY-MM-DD').subtract(9, 'hours'); 
    const addOneDay = moment(moment().tz('Asia/Seoul').format('YYYY-MM-DD'), 'YYYY-MM-DD').subtract(9, 'hours').add(1, 'days'); 
    
    const user = await db.User.findOne({
        where: { id: req.user.id },
        attributes: {
            exclude: ['password']
        },
        include: [{ 
            model: db.Todo,
            as: 'Todos',
            attributes: ['id'], 
            where: [{
                createdAt: { 
                    [Op.gte]: todayDate,
                    [Op.lt]: addOneDay,
                },
            }],
            order: [['important', 'DESC'], ['startTime', 'ASC']],
            required: false,
        }, { 
            model: db.Todo,
            as: 'CompletedTodos',
            attributes: ['id'], 
            where: [{
                createdAt: { 
                    [Op.gte]: todayDate,
                    [Op.lt]: addOneDay,
                },
            }, {
                completion: 1
            }],
            order: [['important', 'DESC'], ['startTime', 'ASC']],
            required: false,
        }],
    });
    return res.status(200).json(user);
});

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

router.post('/signup', async (req, res, next) => {
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

        const todayDate = moment(moment().tz('Asia/Seoul').format('YYYY-MM-DD'), 'YYYY-MM-DD').subtract(9, 'hours'); 
        const addOneDay = moment(moment().tz('Asia/Seoul').format('YYYY-MM-DD'), 'YYYY-MM-DD').subtract(9, 'hours').add(1, 'days'); 
        const rememberLogin = req.body.rememberLogin;
        
        return req.login(user, async (loginErr) => {
            try {
                if(loginErr) {
                    return next(loginErr);
                }

                const userInfo = await db.User.findOne({
                    where: { id: user.id },
                    include: [{ 
                        model: db.Todo,
                        as: 'Todos',
                        attributes: ['id'], 
                        where: [{
                            createdAt: { 
                                [Op.gte]: todayDate,
                                [Op.lt]: addOneDay,
                            },
                        }],
                        order: [['important', 'DESC'], ['startTime', 'ASC']],
                        required: false,
                    }, { 
                        model: db.Todo,
                        as: 'CompletedTodos',
                        attributes: ['id'], 
                        where: [{
                            createdAt: { 
                                [Op.gte]: todayDate,
                                [Op.lt]: addOneDay,
                            },
                        }, {
                            completion: 1
                        }],
                        order: [['important', 'DESC'], ['startTime', 'ASC']],
                        required: false,
                    }],
                    attributes: ['id', 'nickname', 'userId']
                });
                
                rememberLogin ? req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30 : '';

                return res.json(userInfo);
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