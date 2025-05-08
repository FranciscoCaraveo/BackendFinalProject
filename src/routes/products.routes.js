import { Router } from "express";
import { getProducts, getProduct, insertProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { createProductValidation, idParamValidation, updateProductValidation, requireIdParam } from "../middlewares/products.validator.js";




const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);

router.post('/products', createProductValidation, insertProduct);

router.delete('/products', requireIdParam);
router.delete('/products/:id', idParamValidation, deleteProduct);

router.patch('/products', requireIdParam);
router.patch('/products/:id', [...idParamValidation, ...updateProductValidation], updateProduct);


export default router;