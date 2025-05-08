import { check, validationResult } from 'express-validator';

export const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const createOrderDetailValidation = [
    check('order_id')
        .notEmpty().withMessage('Order ID is required')
        .isInt().withMessage('Order ID must be a number'),
    check('product_id')
        .notEmpty().withMessage('Product ID is required')
        .isInt().withMessage('Product ID must be a number'),
    check('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    check('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    validateResults
];
// Verifica que el body no esté vacío
export const validateBodyNotEmpty = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "El cuerpo de la petición está vacío. Debes proporcionar datos para esta operación."
        });
    }
    next();
};

// Verifica campos específicos requeridos
export const validateRequiredFields = (fields) => (req, res, next) => {
    const missingFields = fields.filter(field => req.body[field] === undefined);

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Los siguientes campos son requeridos: ${missingFields.join(', ')}`
        });
    }

    next();
};
export const updateOrderDetailValidation = [
    check('quantity')
        .optional()
        .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    check('price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    validateResults
];

export const orderDetailParamValidation = [
    check('orderId')
        .notEmpty().withMessage('Order ID parameter is required')
        .isInt().withMessage('Order ID must be a number'),
    check('productId')
        .notEmpty().withMessage('Product ID parameter is required')
        .isInt().withMessage('Product ID must be a number'),
    validateResults
];

export const idParamValidation = [
    check('id')
        .notEmpty().withMessage('ID parameter is required')
        .isInt().withMessage('ID must be a number'),
    validateResults
];

export const requireOrderDetailParams = (req, res) => {
    return res.status(400).json({ message: "Favor de introducir ID de orden y ID de producto" });
};

export const requireIdParam = (req, res) => {
    return res.status(400).json({ message: "Favor de introducir ID" });
};