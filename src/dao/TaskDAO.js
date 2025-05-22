import db from '../config/db.js';
import '../errors.js';
import {Task} from '../models/Task.js';

export class TaskDAO {
    async getInPeriod(date_from, date_to, department) {
        try {
            const query =      `WITH patient_data AS (
                                    SELECT p.id, 
                                        p.surname || ' ' || p.firstname || ' ' || COALESCE(p.lastname, '') AS patient_full_name,
                                        p.birth_date,
                                        w.name AS ward_name
                                    FROM croc.patient p
                                        LEFT JOIN croc.anamnesis a ON p.id = a.patient
                                        LEFT JOIN croc.ward w ON a.ward = w.id
                                    WHERE a.discharge_date IS NULL
                                    AND a.department = $3
                                )
                                SELECT id,
                                    scheduled_at,
                                    completed_at,
                                    patient_full_name,
                                    birth_date,
                                    ward_name,
                                    measure,
                                    preparation
                                FROM (
                                        SELECT mb.id,
                                            mb.scheduled_at,
                                            mb.completed_at,
                                            pd.patient_full_name,
                                            pd.birth_date,
                                            pd.ward_name,
                                            m.name AS measure,
                                            NULL AS preparation
                                        FROM croc.measure_book mb
                                            JOIN patient_data pd ON mb.patient = pd.id
                                            JOIN croc.measure m ON mb.measure_type = m.id
                                        UNION
                                        SELECT pb.id,
                                            pb.scheduled_at,
                                            pb.completed_at,
                                            pd.patient_full_name,
                                            pd.birth_date,
                                            pd.ward_name,
                                            NULL AS measure,
                                            pr.name AS preparation
                                        FROM croc.preparation_book pb
                                            JOIN patient_data pd ON pb.patient = pd.id
                                            JOIN croc.preparation pr ON pb.preparation = pr.id
                                        ) tasks
                                WHERE scheduled_at BETWEEN $1::TIMESTAMP AND $2::TIMESTAMP
                            ORDER BY scheduled_at;`;
            const result = await db.query(query,[date_from, date_to, department]);
            return result.rows.map(task => new Task(
                task.id,
                task.scheduled_at,
                task.completed_at,
                task.patient_full_name,
                task.birth_date,
                task.ward_name,
                task.measure,
                task.preparation
            ));
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.error(error.errors[0].stack);
                throw new ServiceUnavailableError('Ошибка подключения к базе данных');
            } else {
                console.error(error.stack);
                throw new InternalServerError(error.message);
            }
        }
    }
}