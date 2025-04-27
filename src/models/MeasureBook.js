export class MeasureBook {
    constructor(id, measure_type, patient, scheduled_at, completed_at) {
        this.id = id;
        this.measure_type = measure_type;
        this.patient = patient;
        this.scheduled_at = scheduled_at;
        this.completed_at = completed_at;
    }

    toJSON() {
        return {
            id: this.id,
            measure_type: this.measure_type,
            patient: this.patient,
            scheduledAt: this.scheduled_at,
            completedAt: this.completed_at
        }
    }

    getDataByList() {
        return [this.patient, this.measure_type, this.scheduled_at, this.completed_at];
    }

    static fromData(data) {
        return new MeasureBook(
            data.id,
            data.measure_type,
            data.patient,
            data.scheduledAt,
            data.completedAt
        );
    }
}