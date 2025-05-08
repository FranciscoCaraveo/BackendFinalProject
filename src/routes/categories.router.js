import { Router } from "express";
import { getCategories, getCategory, deleteCategory, createCategory, updateCategory } from '../controllers/category.controller.js';
import { createCategoryValidation, updateCategoryValidation, idParamValidation, requireIdParam } from '../middlewares/categories.validator.js';

const router = Router();

router.get('/categories', getCategories);
router.get('/categories/:id', idParamValidation, getCategory);

router.post('/categories', createCategoryValidation, createCategory);

router.delete('/categories', requireIdParam);
router.delete('/categories/:id', idParamValidation, deleteCategory);

router.patch('/categories', requireIdParam);
router.patch('/categories/:id', [...idParamValidation, ...updateCategoryValidation], updateCategory);

export default router;