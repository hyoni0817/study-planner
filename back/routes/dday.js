const express = require('express');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const moment = require('moment');

const router = express.Router();
const db = require('../models');
const { isLoggedIn } = require('./middleware');

router.post('/', isLoggedIn, async (req, res, next) => {
    try{
        const newDday = await db.Dday.create({
            title: req.body.title,
            memo: req.body.memo,
            dueDate: req.body.dueDate,
            UserId: req.user.id,
        });
        return res.status(200).json(newDday);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        let where = [Sequelize.literal(`MATCH (title) AGAINST ('+${req.query.DdayTitle}*' in boolean mode)`), {UserId: req.user.id}];
        const endDate = moment(moment(req.query.endDate).format('YYYY-MM-DD'), 'YYYY-MM-DD').add(1, 'days'); 
        const dueDate = req.query.allDateCheckState === 'true' ? '' : where.push({dueDate: {
            [Op.and]: {
                [Op.gte] : req.query.startDate,
                [Op.lt] : endDate,
            }
        }});
        const memo = req.query.memo.length === 0 ? '' :  where.push(
            Sequelize.literal(`MATCH (memo) AGAINST ('+${req.query.memo}*' in boolean mode)`)
        )
        if (parseInt(req.query.lastId)) {
            where.push({
                id: {
                    [Op.gt]: parseInt(req.query.lastId),
                }
            })
        }

        const searchCondition = await db.Dday.findAll({
            where,
            attributes: ['id', 'title', 'dueDate', 'memo', 'viewState'], 
            limit: parseInt(req.query.limit),
            order: [['dueDate', 'ASC']]
        });

        return res.json(searchCondition);
    } catch (e) {
        console.error(e);
        return next(e);
    } 
});

router.put('/edit', isLoggedIn, async (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const memo = req.body.memo;
    const dueDate = req.body.dueDate;
    const UserId = req.user.id;

    try {
        const updateTodo = await db.Dday.update({
            title,
            memo,
            dueDate,
        }, {
            where: [{ id }, { UserId }]
        });

        return res.json({
            id,
            title,
            memo,
            dueDate,
        });
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        const deleteDday = await db.Dday.destroy({
            where : [{ id: req.params.id }, { UserId: req.user.id }]
        })

        return res.send(req.params.id);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.put('/show', async (req, res, next) => {
    try {
        const updateViewState = await db.Dday.update({
            viewState: req.body.viewState,
        }, {
            where: [{id : req.body.id}, {UserId: req.user.id}]
        });

        return res.json({id: req.body.id, viewState: req.body.viewState});
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;