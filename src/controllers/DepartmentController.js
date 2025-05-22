import { DepartmentService } from '../services/DepartmentService.js';
const service = new DepartmentService();

export class DepartmentController {
    async getDepartment(req, res) {
        try {
            const departments = await service.getById(req.params.id);
            res.json({
                departments: departments
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }
    async getDepartmentsOfStaff(req, res) {
        try {
            const organizationId  = req.params.id;
            const departments = await service.getDepartmentsOf(req.session.StaffId, organizationId);
            res.json({
                departments: departments
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            })
        }
    }
    async getDepartments(req, res) {
        try {
            const departments = await service.getAll();
            res.json({
                departments: departments
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }
}
