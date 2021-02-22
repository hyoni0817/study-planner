const express = require('express');

const router = express.Router();
const db = require('../models');

router.get('/', async (req, res, next) => {
    try {
        const todoList = await db.Todo.findAll({
            where: {},
            attributes: ['title', 'subject', 'quantity', 'unit', 'important', 'completion', 'createAt'],
        });

        res.json(todoList);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;