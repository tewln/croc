import PatientDAO from '../dao/PatientDAO.js';
import Patient from '../models/Patient.js';

class PatientService {
    async getPatientById(id) {
        const patientData = await PatientDAO.getPatientById(id);
        if (!patientData) {
            throw new Error('Пациент не найден');
        }
        return new Patient(
            patientData.id,
            patientData.firstname,
            patientData.surname,
            patientData.lastname,
            patientData.birth_date,
            patientData.allergy
        );
    }

    async getPatients() {
        const patientsData = await PatientDAO.getPatients();
        if (!patientsData || patientsData.length === 0) {
            throw new Error('Пациенты не найдены');
        }
        return patientsData.map(patientData => new Patient(
            patientData.id,
            patientData.firstname,
            patientData.surname,
            patientData.lastname,
            patientData.birth_date,
            patientData.allergy
        ));
    }

    async createPatient(firstname, surname, lastname, birth_date, allergy) {
        const patientId = await PatientDAO.addPatient(firstname, surname, lastname, birth_date, allergy);
        return patientId;
    }

    async deletePatient(id) {
        await PatientDAO.deletePatientById(id);
    }
}

export default new PatientService();