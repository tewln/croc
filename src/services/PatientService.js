import { PatientDAO } from '../dao/PatientDAO.js';
import { Patient } from '../models/Patient.js';
import { NotFoundError, InternalServerError, ConflictError, ValidationError, ServiceUnavailableError } from '../errors.js';

const dao = new PatientDAO();

export class PatientService {
    async getById(id) {
        try {
            const patient = await dao.getById(id);
            if (!patient) {
                throw new NotFoundError('Пациент не найден');
            }
            return patient;
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof ServiceUnavailableError ||
                error instanceof InternalServerError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении пациента: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const patients = await dao.getAll();
            if (!patients || patients.length === 0) {
                throw new NotFoundError('Пациенты не найдены');
            }
            return patients;
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof InternalServerError ||
                error instanceof ServiceUnavailableError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при получении списка пациентов: ${error.message}`);
        }
    }

    async create(patientData) {
        try {
            const errors = [];
            if (!patient.firstname) errors.push('firstname');
            if (!patient.surname) errors.push('surname');
            if (!patient.birth_date) errors.push('birth_date');
            if (errors.length > 0) {
                throw new ValidationError('Не все обязательные поля заполнены', errors);
            }
            const patientData = Patient.fromData(patient);
            return await dao.add(patientData);
        } catch (error) {
            if (error instanceof ValidationError ||
                error instanceof ServiceUnavailableError ||
                error instanceof InternalServerError ||
                error instanceof ConflictError) {
                throw error;
            } else if (error.code === '23505') {
                throw new ConflictError('Пациент с такими данными уже существует');
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при добавлении пациента: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await dao.delete(id);
        } catch (error) {
            if (error instanceof NotFoundError ||
                error instanceof InternalServerError ||
                error instanceof ServiceUnavailableError) {
                throw error;
            }
            console.error(error.stack);
            throw new InternalServerError(`Ошибка при удалении пациента: ${error.message}`);
        }
    }
}
