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
}
