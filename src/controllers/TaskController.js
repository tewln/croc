import { TaskService } from '../services/TaskService.js';
const service = new TaskService();

export class TaskController {
    async getInPeriod(req, res) {
        try {
            const tasks = await service.getInPeriod(req.query.dateFrom, req.query.dateTo, req.session.DepartmentId);
            res.json({
                tasks: tasks
            });
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }
}