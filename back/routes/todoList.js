const express = require('express');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const moment = require('moment');

const router = express.Router();
const db = require('../models');

router.get('/', async (req, res, next) => {
    try {
        const todoList = await db.Todo.findAll({
            where: {},
            attributes: ['id', 'title', 'subject', 'quantity', 'unit', 'important', 'startTime', 'endTime', 'allDayStatus', 'completion', 'createdAt'],
        });
        res.json(todoList);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/today', async (req, res, next) => {
    try {
        const todayDate = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD'); 
        const addOneDay = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').add(1, 'days'); 
        let where = [{
            createdAt: { 
                [Op.gte]: todayDate,
                [Op.lt]: addOneDay,
            }
        }];

        if (parseInt(req.query.lastId)) {
            where.push({
                id: {
                    [Op.lt]: parseInt(req.query.lastId, 10),
                },
            })
        }

        const todoList = await db.Todo.findAll({
            where,
            attributes: ['id', 'title', 'subject', 'quantity', 'unit', 'important', 'startTime', 'endTime', 'allDayStatus', 'completion', 'createdAt'],
            limit: parseInt(req.query.limit),
        });
        res.json(todoList);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;