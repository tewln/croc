import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/croc.user/:id', UserController.getUser);
router.post('/croc.user', UserController.createUser);
router.get('/croc.user/old/:login', UserController.validUser);
router.delete('/croc.user/:id', UserController.deleteUser);

export default router;