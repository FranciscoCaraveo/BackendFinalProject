import { Router } from "express";
import { getUsers, getUser, createUser, deleteUser, updateUser } from "../controllers/user.controller.js";
import { createUserValidation, requireIdParam, idParamValidation, updateUserValidation } from "../middlewares/user.validator.js";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', idParamValidation, getUser);

router.post('/users', createUserValidation, createUser);


router.delete('/users', requireIdParam);
router.delete('/users/:id', idParamValidation, deleteUser);

router.patch('/users', requireIdParam); 
router.patch('/users/:id', [...idParamValidation, ...updateUserValidation], updateUser);




export default router;