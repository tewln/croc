import { DepartmentDAO } from '../dao/DepartmentDAO.js';
import { Department } from '../models/Department.js';
const dao = new DepartmentDAO();
export class DepartmentService {
    async getById(id) {
        const departmentData = await dao.getById(id);
        if (!departmentData) {
            throw new Error('Отделение не найдено');
        }
        return departmentData;
    }
    async getAll() {
        const departmentData = await dao.getAll();
        if (!departmentData) {
            throw new Error('Отделения не найдены');
        }
        return departmentData;
    }

    async getDepartmentsOf(user_id, organization_id) {
        const departmentData = await dao.getDepartmentsOf(user_id, organization_id);
        if (!departmentData) {
            throw new Error('Отделения не найдены');
        }
        return departmentData;
    }
}
