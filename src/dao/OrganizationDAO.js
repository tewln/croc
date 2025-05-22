import db from '../config/db.js';
import { Organization } from '../models/Organization.js';
import '../errors.js';

export class OrganizationDAO {
    async getById(id) {
        try {
            const query = 'SELECT * FROM croc.organization WHERE id = $1';
            const result = await db.query(query, [id]);
            if(result.rows.length === 0) {
                return null;
            }
            const organizationData = result.rows[0];
            return new Organization(
                organizationData.id,
                organizationData.name
            );
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }

    async getOrganizationsOf(staff_id) {
        try {
            const query = `SELECT org.id, org.name FROM croc.organization org
                              JOIN croc.department dep ON dep.pid = org.id
                              JOIN croc.department_staff dep_st ON dep.id = dep_st.department
                            WHERE dep_st.staff = $1
                            GROUP BY org.id`;
            const result = await db.query(query, [staff_id]);
            if(result.rows.length === 0) {
                return [];
            }
            return result.rows.map(organizationsData => new Organization(
                organizationsData.id,
                organizationsData.name
            ));
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }

    async getAll() {
        try {
            const result = await db.query('SELECT * FROM croc.organization');
            if(result.rows.length === 0) {
                return [];
            }
            return result.rows.map(organizationsData => new Organization(
                organizationsData.id,
                organizationsData.name
            ));
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }
}