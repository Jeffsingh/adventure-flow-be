const {validationResult} = require('express-validator');

const customValidationResult = validationResult.withDefaults({
    formatter: ({msg, param}) => msg + ': ' + param
})

const validateRequest = (req, res, next) => {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next()
}

module.exports = {
    validateRequest
}