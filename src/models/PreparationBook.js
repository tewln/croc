export class PreparationBook {
    constructor(id, patient, preparation, quantity, scheduled_at, completed_at) {
        this.id = id;
        this.patient = patient;
        this.preparation = preparation;
        this.quantity = quantity;
        this.scheduled_at = scheduled_at;
        this.completed_at = completed_at;
    }
    toJSON() {
        return {
            id: this.id,
            patient: this.patient,
            preparation: this.preparation,
            quantity: this.quantity,
            scheduledAt: this.scheduled_at,
            completedAt: this.completed_at
        }
    }
    getDataByList() {
        return [this.patient, this.preparation, this.quantity, this.scheduled_at, this.completed_at];
    }
    static fromData(data) {
        return new PreparationBook(
            data.id,
            data.patient,
            data.preparation,
            data.quantity,
            data.scheduledAt,
            data.completedAt
        );
    }
}