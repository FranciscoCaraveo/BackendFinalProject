import { check, validationResult } from 'express-validator';

export const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const createProductValidation = [
    check('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters'),
    check('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    check('category_id')
        .notEmpty().withMessage('Category ID is required')
        .isInt().withMessage('Category ID must be a number'),
    check('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
    validateResults
];

export const updateProductValidation = [
    check('title')
        .optional()
        .isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters'),
    check('price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    check('category_id')
        .optional()
        .isInt().withMessage('Category ID must be a number'),
    check('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
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