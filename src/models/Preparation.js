export class Preparation {
    constructor(id, name, narcotic) {
        this.id = id;
        this.name = name;
        this.narcotic = narcotic;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            narcotic: this.narcotic
        }
    }

    getDataByList() {
        return [this.name, this.narcotic];
    }

    static fromData(data) {
        return new Preparation(
            data.id,
            data.name,
            data.narcotic
        );
    }
}