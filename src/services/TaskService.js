import { TaskDAO } from '../dao/TaskDAO.js';
import { Task } from '../models/Task.js';
const dao = new TaskDAO();

export class TaskService {
    async getInPeriod(date_from, date_to) {
        const tasks = await dao.getInPeriod(date_from, date_to);
        if (!tasks) {
            throw new Error('Задания не найдены');
        }
        return tasks;
    }
}