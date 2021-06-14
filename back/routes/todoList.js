const express = require('express');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const moment = require('moment');

const router = express.Router();
const db = require('../models');
const { isLoggedIn } = require('./middleware');

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        let where = [{ UserId: req.user.id }];
        if (parseInt(req.query.lastId)) {
            where[1] = {
                id: {
                    [Op.gt]: parseInt(req.query.lastId),
                }
            }
        }

        const todoList = await db.Todo.findAll({
            where,
            attributes: ['id', 'title', 'subject', 'quantity', 'unit', 'important', 'startTime', 'endTime', 'allDayStatus', 'completion', 'createdAt'],
            limit: parseInt(req.query.limit),
            order: [['createdAt', 'DESC'], ['startTime', 'ASC']]
        });
        res.json(todoList);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/now', isLoggedIn, async (req, res, next) => {
    try {  
        const timeFormat = 'HH:mm'; 
        const todayDate = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD'); 
        const addOneDay = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').add(1, 'days'); 
        const nowTime = moment().format(timeFormat);

        let where = [{
            UserId: req.user.id,
            createdAt: { 
                    [Op.gte]: todayDate,
                    [Op.lt]: addOneDay,
                }
            }, {[Op.or]: [
                {
                    startTime: {
                        [Op.lte]: nowTime,
                    },
                    endTime: {
                        [Op.gte]: nowTime,
                    }
                }, {
                    allDayStatus: 1
                }
            ]}
        ];

        const todoList = await db.Todo.findAll({
            where,
            attributes: ['id', 'title', 'subject', 'quantity', 'unit', 'important', 'startTime', 'endTime', 'allDayStatus', 'completion', 'createdAt'],
            order: [['important', 'DESC'], ['startTime', 'ASC']]
        });

        res.json(todoList);
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.get('/today', isLoggedIn, async (req, res, next) => {
    try {
        const todayDate = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD'); 
        const addOneDay = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').add(1, 'days'); 
        let where = [{
            UserId: req.user.id,
            createdAt: { 
                [Op.gte]: todayDate,
                [Op.lt]: addOneDay,
            }
        }];
        const offset = 10 * (req.query.page - 1);

        const todoList = await db.Todo.findAll({
            where,
            attributes: ['id', 'title', 'subject', 'quantity', 'unit', 'important', 'startTime', 'endTime', 'allDayStatus', 'completion', 'createdAt'],
            limit: parseInt(req.query.limit),
            offset,
            order: [['important', 'DESC'], ['startTime', 'ASC']]
        });
        res.json(todoList);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;