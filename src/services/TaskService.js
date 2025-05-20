import { TaskDAO } from '../dao/TaskDAO.js';
import { Task } from '../models/Task.js';
const dao = new TaskDAO();

export class TaskService {
    async getInPeriod(date_from, date_to, department) {
        const tasks = await dao.getInPeriod(date_from, date_to, department);
        if (!tasks) {
            throw new Error('Задания не найдены');
        }
        return tasks;
    }
}