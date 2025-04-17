import { PatientDAO } from '../dao/PatientDAO.js';
import { Patient } from '../models/Patient.js';
const dao = new PatientDAO();
//статик или синглтон?
export class PatientService {
    async getById(id) {
        const patientData = await dao.getById(id);
        if (!patientData) {
            throw new Error('Пациент не найден');
        }
        return patientData;
    }

    async getAll() {
        const patientsData = await dao.getAll();
        if (!patientsData || patientsData.length === 0) {
            throw new Error('Пациенты не найдены');
        }
        return patientsData;
    }

    async create(patientData) {
        const patient = Patient.fromData(patientData);
        const patientId = await dao.add(patient);
        return patientId;
    }

    async delete(id) {
        await dao.delete(id);
    }
}
