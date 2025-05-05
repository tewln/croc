export class TaskInformation {
    constructor(scheduled_at, patient_full_name, birth_date, ward_name, doctor_full_name, diagnosis, allergy, name, dosage, measure_unit, quantity, narcotic, task_type) {
        this.scheduled_at = scheduled_at;
        this.patient_full_name = patient_full_name;
        this.birth_date = birth_date;
        this.ward_name = ward_name;
        this.doctor_full_name = doctor_full_name;
        this.diagnosis = diagnosis;
        this.allergy = allergy;
        this.name = name;
        this.dosage = dosage;
        this.measureUnit = measure_unit;
        this.quantity = quantity;
        this.narcotic = narcotic;
        this.task_type = task_type;
    }
    toJSON() {
        return {
            scheduledAt: this.scheduled_at,
            patientFullName: this.patient_full_name,
            birthDate: this.birth_date,
            ward: this.ward_name,
            doctorFullName: this.doctor_full_name,
            diagnosis: this.diagnosis,
            allergy: this.allergy,
            taskType: this.task_type,
            taskName: this.name,
            dosage: this.dosage,
            measureUnit: this.measure_unit,
            quantity: this.quantity,
            narcotic: this.narcotic,
        }
    }
    static fromData(data) {
        return new TaskInformation(
            data.scheduled_at,
            data.patient_full_name,
            data.birth_date,
            data.ward_name,
            data.doctor_full_name,
            data.diagnosis,
            data.allergy,
            data.name,
            data.dosage,
            data.measure_unit,
            data.quantity,
            data.narcotic,
            data.task_type
        );
    }
}
