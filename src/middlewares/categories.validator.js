import { check, validationResult } from 'express-validator';

export const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const createCategoryValidation = [
    check('name')
        .notEmpty().withMessage('Category name is required')
        .isString().withMessage('Category name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Category name must be between 2 and 50 characters'),
    validateResults
];

export const updateCategoryValidation = [
    check('name')
        .notEmpty().withMessage('Category name is required')
        .isString().withMessage('Category name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Category name must be between 2 and 50 characters'),
    validateResults
];

export const idParamValidation = [
    check('id')
        .notEmpty().withMessage('ID parameter is required')
        .isInt().withMessage('ID must be a number'),
    validateResults
];

export const requireIdParam = (req, res) => {
    return res.status(400).json({ message: "Favor de introducir ID de categoría" });
};