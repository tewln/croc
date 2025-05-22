import { OrganizationDAO } from '../dao/OrganizationDAO.js';
import { NotFoundError, InternalServerError, BadRequestError } from '../errors.js';
//TODO: затраить все функции на ошибки
const dao = new OrganizationDAO();
export class OrganizationService {
    async getById(id) {
        const organizationData = await dao.getById(id);
        if (!organizationData) {
            throw new NotFoundError('Организация не найдена');
        }
        return organizationData;
    }
    async getAll() {
        const organizationData = await dao.getAll();
        if (!organizationData) {
            throw new NotFoundError('Организации не найдены');
        }
        return organizationData;
    }

    async getOrganizationsOf(user_id) {
        const organizationData = await dao.getOrganizationsOf(user_id);
        if (!organizationData) {
            throw new NotFoundError('Организации не найдены');
        }
        return organizationData;
    }
}
