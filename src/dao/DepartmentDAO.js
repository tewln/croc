import db from '../config/db.js';
import { Department } from '../models/Department.js';

export class DepartmentDAO {
    async getById(id) {
        const query = 'SELECT * FROM croc.department WHERE id = $1';
        const result = await db.query(query, [id]);
        if(result.rows.length === 0) {
            return null;
        }
        const departmentData = result.rows[0];
        return new Department(
            departmentData.id,
            departmentData.name,
            departmentData.pid
        );
    }
    async getDepartmentsOf(staff_id, organization_id) {
        const query = `SELECT dep.id, dep.name, dep.pid FROM croc.department dep
                          JOIN croc.department_staff dep_st ON dep.id = dep_st.department
                          JOIN croc.organization org ON dep.pid = org.id
                        WHERE dep_st.staff = $1
                        AND org.id = $2`;
        const result = await db.query(query, [staff_id, organization_id]);
        if(result.rows.length === 0) {
            return [];
        }
        return result.rows.map(departmentsData => new Department(
            departmentsData.id,
            departmentsData.name,
            departmentsData.pid
        ));
    }
    async getAll() {
        const result = await db.query('SELECT * FROM croc.department');
        if(result.rows.length === 0) {
            return [];
        }
        return result.rows.map(departmentsData => new Department(
            departmentsData.id,
            departmentsData.name,
            departmentsData.pid
        ));
    }
}