import PatientDAO from '../dao/PatientDAO.js';

class PatientService {
    async getPatientById(id) {
        const patientData = await PatientDAO.getPatientById(id);
        if (!patientData) {
            throw new Error('Пациент не найден');
        }
        return patientData;
    }

    async getPatients() {
        const patientsData = await PatientDAO.getPatients();
        if (!patientsData || patientsData.length === 0) {
            throw new Error('Пациенты не найдены');
        }
        return patientsData;
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