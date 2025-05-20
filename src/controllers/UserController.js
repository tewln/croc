import {UserService} from '../services/UserService.js';
const service = new UserService();

export class UserController {
    async get(req, res) {
        try {
            const user = await service.getById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { login, password, staff } = req.body;
            const userId = await service.create(login, password, staff);
            res.status(201).json({ id: userId });
        } catch (error) {
            res.status(409).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body;
            const userData = await service.validation(login, password);
            if (userData) {
                req.session.isAuthenticated = true;
                req.session.UserId = userData.id;
                req.session.StaffId = await service.getStaffIdById(userData.id);
                res.status(204).send();
            } else {
            res.status(401).json({ error: 'Требуется авторизация' });
            }
        } catch (error) {
            if (error.name === 'DatabaseIsDownError') {
                res.status(521).json({ error: error.message });
            }
            else {
            res.status(400).json({ error: error.message });
            }
        }
    }

    async logout(req, res) {
        try {
            req.session.destroy();
            res.status(204).send();
        }
        catch (error) {
            return res.status(500).json({ error: 'Ошибка выхода' });
        };
    }

    async delete(req, res) {
        try {
            await service.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async saveInfo(req, res) {
        try {
            req.session.DepartmentId = await service.setDepartment(req.body.departmentId);
            req.session.OrganizationId = await service.setOrganization(req.body.organizationId)
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
