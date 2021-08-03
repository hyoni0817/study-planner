const express = require('express');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const moment = require('moment');

const db = require('../models');
const router = express.Router();
const { isLoggedIn } = require('./middleware');

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const todayDate = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD'); 
        const addOneDay = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').add(1, 'days'); 
        
        const newTodo = await db.Todo.create({
            title: req.body.title,
            subject: req.body.selectSubject,
            quantity: req.body.quantity,
            unit: req.body.unit,
            important: req.body.important,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            allDayStatus: req.body.allDayStatus,
            UserId: req.user.id,
        });

        const todoAndCompletedCount = await db.User.findOne({
            where: { id: req.user.id },
            attributes: ['id'],
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
        const result = {
            newTodo,
            count: {
                Todos: todoAndCompletedCount.Todos.length,
                CompletedTodos: todoAndCompletedCount.CompletedTodos.length,
            },
        }

        return res.status(200).json(result);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        let where = [Sequelize.literal(`MATCH (title) AGAINST ('+${req.query.todoTitle}*' in boolean mode)`), {UserId: req.user.id}];
        const endDate = moment(moment(req.query.endDate).format('YYYY-MM-DD'), 'YYYY-MM-DD').add(1, 'days'); 
        const createdAt = req.query.allDateCheckState === true ? '' : where.push({createdAt: {
            [Op.and]: {
                [Op.gte] : req.query.startDate,
                [Op.lt] : endDate
            }
        }});
        const subject = req.query.subjects.length === 0 ? '' :  where.push({subject:{
            [Op.in]: [req.query.subjects]
        }})
        const offset = 10 * (req.query.page - 1);
        
        const searchCondition = await db.Todo.findAll({
            where,
            attributes: ['id', 'title', 'subject', 'quantity', 'unit', 'important', 'startTime', 'endTime', 'allDayStatus', 'completion', 'createdAt'], 
            limit: parseInt(req.query.limit),
            offset,
            order: [['createdAt', 'DESC'],['startTime', 'ASC']]
        });
        return res.json(searchCondition);
    } catch (e) {
        console.error(e);
        return next(e);
    } 
})

router.get('/subjects', isLoggedIn, async (req, res, next) => {
    try {
        const subjectList = await db.Todo.findAll({
            where: {UserId: req.user.id},
            attributes: [
                //Sequelize.fn('DISTINCT', Sequelize.col('subject'))
                'id',
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

router.put('/complete', async (req, res, next) => {
    try {
        const todayDate = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD'); 
        const addOneDay = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').add(1, 'days'); 
        
        const updateCompletion = await db.Todo.update({
            completion: req.body.checkBtnState,
        }, {
            where: {id : req.body.id, UserId: req.user.id}
        });

        const todoAndCompletedCount = await db.User.findOne({
            where: { id: req.user.id },
            attributes: ['id'],
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
        const result = {
            id: req.body.id, 
            completion: req.body.checkBtnState,
            count: {
                Todos: todoAndCompletedCount.Todos.length,
                CompletedTodos: todoAndCompletedCount.CompletedTodos.length,
            },
        }

        return res.json(result);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.put('/edit', isLoggedIn, async (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const subject = req.body.selectSubject;
    const quantity = req.body.quantity;
    const unit = req.body.unit;
    const important = req.body.important;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const allDayStatus = req.body.allDayStatus;

    try {
        const updateTodo = await db.Todo.update({
            title,
            subject,
            quantity,
            unit,
            important,
            startTime,
            endTime,
            allDayStatus,
        }, {
            where: { id, UserId: req.user.id }
        });

        return res.json({
            id,
            title,
            subject,
            quantity,
            unit,
            important,
            startTime,
            endTime,
            allDayStatus,
        });
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        const deleteTodo = await db.Todo.destroy({
            where : { id: req.params.id, UserId: req.user.id }
        })

        return res.send(req.params.id);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;