import { OrganizationDAO } from '../dao/OrganizationDAO.js';
import { Organization } from '../models/Organization.js';
const dao = new OrganizationDAO();
export class OrganizationService {
    async getById(id) {
        const organizationData = await dao.getById(id);
        if (!organizationData) {
            throw new Error('Организация не найдена');
        }
        return organizationData;
    }
    async getAll() {
        const organizationData = await dao.getAll();
        if (!organizationData) {
            throw new Error('Организации не найдены');
        }
        return organizationData;
    }

    async getOrganizationsOf(user_id) {
        const organizationData = await dao.getOrganizationsOf(user_id);
        if (!organizationData) {
            throw new Error('Организации не найдены');
        }
        return organizationData;
    }
}
