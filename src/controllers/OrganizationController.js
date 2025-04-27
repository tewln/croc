import { OrganizationService } from '../services/OrganizationService.js';
const service = new OrganizationService();

export class OrganizationController {
    async getOrganization(req, res) {
        try {
            const organization = await service.getById(req.params.id);
            res.json({
                organizations: [organization]
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }
    async getOrganizationsOfStaff(req, res) {
        try {
            const organizations = await service.getOrganizationsOf(req.session.StaffId);
            res.json({
                organizations: organizations
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            })
        }
    }
    async getOrganizations(req, res) {
        try {
            const organizations = await service.getAll();
            res.json({
                organizations: organizations
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }
}
