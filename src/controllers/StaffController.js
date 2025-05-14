import { StaffService } from '../services/StaffService.js';
import { OrganizationService } from '../services/OrganizationService.js';
import { DepartmentService } from '../services/DepartmentService.js';
const orgService = new OrganizationService();
const depService = new DepartmentService();
const service = new StaffService();

export class StaffController {
    async getById(req, res) {
        try {
            const staff = await service.getById(req.params.id);
            res.json({
                staff: [staff]
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }
    async setStaffId(req, res) {
        try {
            const id = await service.getIdByUserId(req.session.UserId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    }
    async getHeader(req, res) {
        try {
            const staff = req.session.StaffId;
            const organization = req.session.OrganizationId;
            const org = await orgService.getById(organization);
            const nameOrg = org.name;
            const department = req.session.DepartmentId;
            const dep = await depService.getById(department);
            const nameDep = dep.name;
            const header = await service.getHeaderByStaffId(staff, nameOrg, nameDep);
            res.json({
                header: [header]
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            })
        }
    }
}
