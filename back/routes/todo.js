const express = require('express');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const newTodo = await db.Todo.create({
            title: req.body.title,
            subject: req.body.selectSubject,
            quantity: req.body.quantity,
            unit: req.body.unit,
            important: req.body.important,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            allDayStatus: req.body.allDayStatus,
        });
        console.log(newTodo);
        return res.status(200).json(newTodo);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        let where = [Sequelize.literal(`MATCH (title) AGAINST ('+${req.query.todoTitle}*' in boolean mode)`)];
        const createdAt = req.query.allDateCheckState === true ? '' : where.push({createdAt: {
            [Op.and]: {
                [Op.gte] : req.query.startDate,
                [Op.lte] : req.query.endDate
            }
        }});
        const subject = req.query.subjects.length === 0 ? '' :  where.push({subject:{
            [Op.in]: [req.query.subjects]
        }})
        const searchCondition = await db.Todo.findAll({
            where,
            attributes: ['title', 'subject', 'quantity', 'unit', 'important', 'startTime', 'endTime', 'allDayStatus', 'completion', 'createdAt'], 
        });

        return res.json(searchCondition);
    } catch (e) {
        console.error(e);
        return next(e);
    } 
})

router.get('/subjects', async (req, res, next) => {
    try {
        const subjectList = await db.Todo.findAll({
            where: {},
            attributes: [
                //Sequelize.fn('DISTINCT', Sequelize.col('subject'))
                'subject'
            ],
            group: ['subject']
        });

        return res.json(subjectList);
    } catch (e) {
        console.error(e);
        return next(e);
    }
})

module.exports = router;