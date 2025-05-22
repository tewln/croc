import { TaskDAO } from '../dao/TaskDAO.js';
import { Task } from '../models/Task.js';
import '../errors.js';

const dao = new TaskDAO();
//TODO: добавить валидацию дат
export class TaskService {
    async getInPeriod(date_from, date_to, department) {
        try {
            if (!date_from || !date_to) {
                throw new BadRequestError('Необходимо указать период дат');
            }
            
            if (!department) {
                throw new BadRequestError('Необходимо указать отделение');
            }
            
            const tasks = await dao.getInPeriod(date_from, date_to, department);
            if (!tasks || tasks.length === 0) {
                throw new NotFoundError('Задания не найдены');
            }
            return tasks;
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof BadRequestError ||
                error instanceof ServiceUnavailableError ||
                error instanceof InternalServerError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(
                `Ошибка при получении заданий: ${error.message}`
            );
        }
    }
}