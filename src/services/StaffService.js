import { StaffDAO } from '../dao/StaffDAO.js';
import { Staff } from '../models/Staff.js';
const dao = new StaffDAO();
//статик или синглтон?
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
    async getHeaderByStaffId(staff_id, nameOrg, nameDep){
        const header = await dao.getHeaderByStaffId(staff_id, nameOrg, nameDep);
        return header;
    }
}
