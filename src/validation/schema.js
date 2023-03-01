const {body} = require('express-validator');

const tripSchema = [
    body('name').notEmpty(),
    body('duration').isNumeric(),
    body('start_date').notEmpty(),
    body('activities.*.id').notEmpty().isNumeric()
];

const activitySchema = [
    body('name').notEmpty(),
];

const itemSchema = [
    body('name').notEmpty(),
];

const signupSchema = [
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').isEmail(),
    body('password').notEmpty().matches("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"),
];

const loginSchema = [
    body('email').isEmail(),
    body('password').notEmpty(),
];

module.exports = {tripSchema, activitySchema, itemSchema, signupSchema, loginSchema};