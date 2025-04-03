import {UserService} from '../services/UserService.js';
import { body, validationResult, param, query } from 'express-validator';

export class UserController {
    async getUser(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async getOrganizations(req, res) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.sendStatus(401);
    } //Доделать

    async createUser(req, res) {
        try {
            const { firstname, surname, lastname, birth_date, allergy } = req.body;
            const userId = await UserService.createUser(firstname, surname, lastname, birth_date, allergy);
            res.status(201).json({ id: userId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async validUser(req, res) {
        try {
            const { login, password } = req.body;
            const userID = await UserService.validUser(login, password);
            //res.status(???).json({ id: userId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}
