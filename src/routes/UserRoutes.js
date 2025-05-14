import express from 'express';
import { UserController } from '../controllers/UserController.js';
import { body, validationResult } from 'express-validator';
const controller = new UserController();

const router = express.Router();

router.get('/user/:id', controller.get);
router.post(
    '/user/registration', [ 
    body('login')
        .notEmpty().withMessage('Имя пользователя обязательно') 
        .isLength({ min: 3 }).withMessage('Минимум 3 символа'),
    body('password')
        .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        }).withMessage('Пароль слишком слабый'),
    body('staff')
        .notEmpty().withMessage('Введите id сотрудника')
        .isNumeric().withMessage('Некорректный id сотрудника'),
    ], /*(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }*/
        
    controller.create);
router.post(
    '/user/login', [
    body('username')
        .notEmpty().withMessage('Введите логин'),
    body('password')
        .notEmpty().withMessage('Введите пароль'),
  ],
    controller.login);
router.post('/user/logout', controller.logout);
router.delete('/user/:id', controller.delete);
router.post('/user/save-info', controller.saveInfo);

export default router;