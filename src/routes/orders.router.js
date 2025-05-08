import { Router } from "express";
import { getOrders, getOrder, updateOrder, createOrder, deleteOrder } from "../controllers/orders.controller.js";
import { createOrderValidation, updateOrderValidation, idParamValidation, requireIdParam } from "../middlewares/orders.validator.js";

const router = Router();

router.get('/orders', getOrders);
router.get('/orders/:id', idParamValidation, getOrder);

router.post('/orders', createOrderValidation, createOrder);

router.delete('/orders', requireIdParam);
router.delete('/orders/:id', idParamValidation, deleteOrder);

router.patch('/orders', requireIdParam);
router.patch('/orders/:id', [...idParamValidation, ...updateOrderValidation], updateOrder);

export default router;