export class Staff {
    constructor(id, firstname, surname, lastname, position) {
        this.id = id;
        this.firstname = firstname;
        this.surname = surname;
        this.lastname = lastname;
        this.position = position;
    }
    getDataByList() {
        return [this.firstname, this.surname, this.lastname, this.position];
    }
    static fromData(data) {
        return new Staff(data.id, data.firstname, data.surname, data.lastname, data.position);
    }
}