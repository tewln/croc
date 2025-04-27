export class PreparationBook {
    constructor(id, patient, preparation, dosage, quantity, scheduled_at, completed_at) {
        this.id = id;
        this.patient = patient;
        this.preparation = preparation;
        this.dosage = dosage;
        this.quantity = quantity;
        this.scheduled_at = scheduled_at;
        this.completed_at = completed_at;
    }

    toJSON() {
        return {
            id: this.id,
            patient: this.patient,
            preparation: this.preparation,
            dosage: this.dosage,
            quantity: this.quantity,
            scheduledAt: this.scheduled_at,
            completedAt: this.completed_at
        }
    }

    getDataByList() {
        return [this.patient, this.preparation, this.dosage, this.quantity, this.scheduled_at];
    }

    static fromData(data) {
        return new PreparationBook(
            data.id,
            data.patient,
            data.preparation,
            data.dosage,
            data.quantity,
            data.scheduledAt,
            data.completedAt
        );
    }
}