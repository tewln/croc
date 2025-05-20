export class Task {
    constructor(id, scheduled_at, completed_at, patient, birth_date, ward, measures, preparations) {
        this.id = id
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
            id : this.id,
            scheduledAt: this.scheduled_at,
            completedAt: this.completed_at,
            patientFullName: this.patientFullName,
            birthDate: this.birth_date,
            ward: this.ward,
            measures: this.measures,
            preparations: this.preparations
        }
    }
    getDataByList() {
        return [
            this.id,
            this.scheduled_at,
            this.completed_at,
            this.patient,
            this.ward,
            this.measures,
            this.preparations
        ];
    }
}
