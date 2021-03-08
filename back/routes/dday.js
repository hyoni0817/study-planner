const express = require('express');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const router = express.Router();
const db = require('../models');

router.post('/', async (req, res, next) => {
    try{
        const newDday = await db.Dday.create({
            title: req.body.title,
            memo: req.body.memo,
            dueDate: req.body.dueDate,
        });
        return res.status(200).json(newDday);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        let where = [Sequelize.literal(`MATCH (title) AGAINST ('+${req.query.DdayTitle}*' in boolean mode)`)];
        const dueDate = req.query.allDateCheckState === true ? '' : where.push({dueDate: {
            [Op.and]: {
                [Op.gte] : req.query.startDate,
                [Op.lte] : req.query.endDate
            }
        }});
        const memo = req.query.memo.length === 0 ? '' :  where.push(
            Sequelize.literal(`MATCH (memo) AGAINST ('+${req.query.memo}*' in boolean mode)`)
        )
        const searchCondition = await db.Dday.findAll({
            where,
            attributes: ['id', 'title', 'dueDate', 'memo'], 
        });

        return res.json(searchCondition);
    } catch (e) {
        console.error(e);
        return next(e);
    } 
});

module.exports = router;