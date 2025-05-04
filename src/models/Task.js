export class Task {
    constructor(scheduled_at, completed_at, patient, birth_date, ward, measures, preparations) {
        this.scheduled_at = scheduled_at;
        this.completed_at = completed_at;
        this.patientFullName = patient;
        this.birth_date = birth_date;
        this.ward = ward;
        this.measures = measures;
        this.preparations = preparations;
    }
    toJSON() {
        return {
            scheduledAt: this.scheduled_at,
            completedAt: this.completed_at,
            patient: this.patient,
            birthDate: this.birth_date,
            ward: this.ward,
            measures: this.measures,
            preparations: this.preparations
        }
    }
    getDataByList() {
        return [
            this.scheduled_at,
            this.completed_at,
            this.patient,
            this.ward,
            this.measures,
            this.preparations
        ];
    }
    static fromData(data) {
        return new Patient(
            data.scheduledAt,
            data.completedAt,
            data.patient,
            data.ward,
            data.measures,
            data.preparations
        );
    }
}
