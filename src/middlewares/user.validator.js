import { check, validationResult } from 'express-validator';

export const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const createUserValidation = [
    check('username')
        .notEmpty().withMessage('Username is requiered')
        .isLength({ min: 3, max: 50 }).withMessage('Username need to be between 3 and 50 characters'),
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Needs to be a valid email'),
    validateResults
];

// Reglas de validación para actualizar usuario
export const updateUserValidation = [
    check('username')
        .optional()
        .isLength({ min: 3, max: 50 }).withMessage('El username debe tener entre 3 y 50 caracteres'),
    check('email')
        .optional()
        .isEmail().withMessage('Debe ser un email válido'),
    validateResults
];


export const idParamValidation = [
    check('id')
        .notEmpty().withMessage('El parámetro ID es requerido')
        .isInt().withMessage('El ID debe ser un número'),
    validateResults
];

export const requireIdParam = (req, res) => {
    return res.status(400).json({ message: "Favor de introducir ID" });
};