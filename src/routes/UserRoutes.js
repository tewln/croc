import express from 'express';
import { UserController } from '../controllers/UserController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/user/:id', UserController.getUser);
router.post(
    '/user/registration', [ 
    body('username')
        .notEmpty().withMessage('Имя пользователя обязательно') 
        .isLength({ min: 3 }).withMessage('Минимум 3 символа'),
    body('password')
        .isStrongPassword({   // Сильный пароль:
        minLength: 8,       // ≥ 8 символов
        minLowercase: 1,    // ≥ 1 строчная буква
        minUppercase: 1,    // ≥ 1 заглавная буква
        minNumbers: 1,      // ≥ 1 цифра
        }).withMessage('Пароль слишком слабый'),
    ],
    UserController.createUser);//как связать user и staff?
router.post(
    '/user/login', [
    body('username')
        .notEmpty().withMessage('Введите логин'),
    body('password')
        .notEmpty().withMessage('Введите пароль'),
  ],
    UserController.validUser);
router.delete('/user/:id', UserController.deleteUser);

export default router;