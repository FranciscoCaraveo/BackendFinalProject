import { Router } from "express";
import { getOrderDetails, getOrderDetail, deleteOrderDetail, updateOrderDetail, createOrderDetail } from '../controllers/orderDetails.controller.js';
import { createOrderDetailValidation, updateOrderDetailValidation, requireOrderDetailParams, validateRequiredFields, requireIdParam } from "../middlewares/ordersDatails.validator.js";

const router = Router();

router.get('/orderDeta', getOrderDetails);
router.get('/orderDeta/:id', getOrderDetail);


router.post('/orderDeta', createOrderDetailValidation, createOrderDetail);

router.delete('/orderDeta', requireOrderDetailParams)
router.delete('/orderDeta/:id', deleteOrderDetail);

router.patch('/orderDeta', requireOrderDetailParams);
router.patch('/orderDeta/:orderId/:productId', updateOrderDetailValidation, validateRequiredFields(['quantity', 'price']), updateOrderDetail);
// router.patch('/orderDeta/:id', updateOrderDetailValidation, validateRequiredFields, updateOrderDetail);


export default router;