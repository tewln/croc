import { StaffDAO } from '../dao/StaffDAO.js';
import { Header } from '../models/Header.js';
import { OrganizationService } from '../services/OrganizationService.js';
import { DepartmentService } from '../services/DepartmentService.js';
const dao = new StaffDAO();
const orgService = new OrganizationService();
const depService = new DepartmentService();

export class StaffService {
    async getById(id) {
        const staffData = await dao.getById(id);
        if (!staffData) {
            throw new Error('Сотрудник не найден');
        }
        return staffData;
    }
    async getIdByUserId(user_id) {
        const staff = await dao.getByUserId(user_id);
        return staff.id;
    }
    async getHeaderByStaffId(staff_id, organization_id, department_id) {
        const organization = await orgService.getById(organization_id);
        const organization_name = organization.name;
        const department = await depService.getById(department_id);
        const department_name = department[0].name;
        const staff = await dao.getInfoByStaffId(staff_id);
        return new Header(staff.staff_full_name, staff.position, organization_name, department_name);
    }
}
