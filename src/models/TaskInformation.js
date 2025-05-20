export class TaskInformation {
    constructor(id, scheduled_at, completed_at, patient_surname, patient_firstname, patient_lastname, birth_date, ward_name, doctor_surname, doctor_firstname, doctor_lastname, diagnosis, allergy, name, dosage, measure_unit, quantity, narcotic, task_type, result) {
        this.id = id;
        this.scheduled_at = scheduled_at;
        this.completed_at = completed_at;
        this.patient_surname = patient_surname;
        this.patient_firstname = patient_firstname;
        this.patient_lastname = patient_lastname,
        this.birth_date = birth_date;
        this.ward_name = ward_name;
        this.doctor_surname = doctor_surname;
        this.doctor_firstname = doctor_firstname;
        this.doctor_lastname = doctor_lastname,
        this.diagnosis = diagnosis;
        this.allergy = allergy;
        this.name = name;
        this.dosage = dosage;
        this.measureUnit = measure_unit;
        this.quantity = quantity;
        this.narcotic = narcotic;
        this.task_type = task_type;
        this.result = result;
    }
    toJSON() {
        return {
            taskId: this.id,
            scheduledAt: this.scheduled_at,
            completedAt: this.completed_at,
            patientSurname: this.patient_surname,
            patientFirstname: this.patient_firstname,
            patientLastname: this.patient_lastname,
            birthDate: this.birth_date,
            ward: this.ward_name,
            doctorSurname: this.doctor_surname,
            doctorFirstname: this.doctor_firstname,
            doctorLastname: this.doctor_lastname,
            diagnosis: this.diagnosis,
            allergy: this.allergy,
            taskType: this.task_type,
            taskName: this.name,
            dosage: this.dosage,
            measureUnit: this.measure_unit,
            quantity: this.quantity,
            narcotic: this.narcotic,
            result: this.result
        }
    }
    static fromData(data) {
        return new TaskInformation(
            data.id,
            data.scheduled_at,
            data.completed_at,
            data.patient_surname,
            data.patient_firstname,
            data.patient_lastname,
            data.birth_date,
            data.ward_name,
            data.doctor_surname,
            data.doctor_firstname,
            data.doctor_lastname,
            data.diagnosis,
            data.allergy,
            data.name,
            data.dosage,
            data.measure_unit,
            data.quantity,
            data.narcotic,
            data.task_type,
            data.result
        );
    }
}
