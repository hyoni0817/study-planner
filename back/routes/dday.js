const express = require('express');

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

module.exports = router;