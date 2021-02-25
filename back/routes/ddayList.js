const express = require('express');

const router = express.Router();
const db = require('../models');

router.get('/', async (req, res, next) => {
    try {
        const ddayList = await db.Dday.findAll({
            where: {},
            attributes: ['title', 'contents', 'dueDate', 'viewState'],
        });
        res.json(ddayList);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;