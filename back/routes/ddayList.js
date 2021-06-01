const express = require('express');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const router = express.Router();
const db = require('../models');

router.get('/', async (req, res, next) => {
    try {
        let where = [{ UserId: req.user.id }];

        if (parseInt(req.query.lastId)) {
            where[1] = {
                id: {
                    [Op.gt]: parseInt(req.query.lastId, 10),
                },
            }
        }

        const ddayList = await db.Dday.findAll({
            where,
            attributes: ['id', 'title', 'memo', 'dueDate', 'viewState'],
            limit: parseInt(req.query.limit),
            order: [['dueDate', 'ASC']]
        });
        res.json(ddayList);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/viewable', async(req, res, next) => {
    try {
        let where = [{viewState : 1}, {UserId: req.user.id}];
        if (parseInt(req.query.lastId)) {
            where.push({ 
                id: {
                    [Op.gt]: parseInt(req.query.lastId, 10), 
                }
            })
        } 

        const viewableList = await db.Dday.findAll({
            where,
            attributes: ['id', 'title', 'memo', 'dueDate', 'viewState'],
            limit: parseInt(req.query.limit),
            order: [['dueDate', 'ASC']]
        });
        res.json(viewableList);
    } catch (e) {
        console.error(e);
        return next(e);
    }

})

module.exports = router;