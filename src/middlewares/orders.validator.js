import { check, validationResult } from 'express-validator';

export const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const createOrderValidation = [
    check('user_id')
        .notEmpty().withMessage('User ID is required')
        .isInt().withMessage('User ID must be a number'),
    check('total')
        .notEmpty().withMessage('Total is required')
        .isFloat({ min: 0 }).withMessage('Total must be a positive number'),
    check('status')
        .notEmpty().withMessage('Status is required')
        .isString().withMessage('Status must be a string')
        .isIn(['pending', 'processing', 'completed', 'cancelled']).withMessage('Invalid status value'),
    validateResults
];

export const updateOrderValidation = [
    check('status')
        .notEmpty().withMessage('Status is required')
        .isString().withMessage('Status must be a string')
        .isIn(['pending', 'processing', 'completed', 'cancelled']).withMessage('Invalid status value'),
    validateResults
];

export const idParamValidation = [
    check('id')
        .notEmpty().withMessage('ID parameter is required')
        .isInt().withMessage('ID must be a number'),
    validateResults
];

export const requireIdParam = (req, res) => {
    return res.status(400).json({ message: "Favor de introducir ID" });
};