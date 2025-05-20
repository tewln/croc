export class Dosage {
    constructor(id, dosage, preparation_id, measure_unit) {
        this.id = id;
        this.dosage = dosage; 
        this.preparation_id = preparation_id;
        this.measure_unit = measure_unit;
    }

    toJSON() {
        return {
            id: this.id,
            dosage: this.dosage,
            preparationId: this.preparation_id,
            measureUnit: this.measure_unit
        }
    }

    getDataByList() {
        return [this.dosage, this.preparation_id, this.measure_unit];
    }

    static fromData(data) {
        return new Dosage(
            data.id,
            data.dosage,
            data.preparationId, 
            data.measureUnit
        );
    }
}