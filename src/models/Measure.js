export class Measure {
    constructor(id, name, measure_unit) {
        this.id = id;
        this.name = name;
        this.measure_unit = measure_unit;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            measureUnit: this.measure_unit
        }
    }

    getDataByList() {
        return [this.name, this.measure_unit];
    }

    static fromData(data) {
        return new Measure(
            data.id,
            data.name,
            data.measureUnit
        );
    }
}