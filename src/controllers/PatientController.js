import PatientService from '../services/PatientService.js';

class PatientController {
    async getPatient(req, res) {
        try {
            const patient = await PatientService.getPatientById(req.params.id);
            res.json(patient);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    async getPatients(req, res) {
        try {
            const patients = await PatientService.getPatients();
            res.json(patients);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async createPatient(req, res) {
        try {
            const { firstname, surname, lastname, birth_date, allergy } = req.body;
            const patientId = await PatientService.createPatient(firstname, surname, lastname, birth_date, allergy);
            res.status(201).json({ id: patientId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deletePatient(req, res) {
        try {
            await PatientService.deletePatient(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new PatientController();