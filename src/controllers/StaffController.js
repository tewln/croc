import { StaffService } from '../services/StaffService.js';
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
            const department = req.session.DepartmentId;
            const header = await service.getHeaderByStaffId(staff, organization, department);
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
