const express = require('express');

const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const newTodo = await db.Todo.create({
            title: req.body.title,
            subject: req.body.subject,
            quantity: req.body.quantity,
            unit: req.body.unit,
            important: req.body.important,
        });
        console.log(newTodo);
        return res.status(200).json(newTodo);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;