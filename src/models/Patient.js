import { json } from "express";

export class Patient {
    constructor(id, firstname, surname, lastname, birth_date, allergy) {
        this.id = id;
        this.firstname = firstname;
        this.surname = surname;
        this.lastname = lastname;
        this.birth_date = birth_date;
        this.allergy = allergy;
    }
    toJSON() {
        return {
            id: this.id,
            firstname: this.firstname,
            surname: this.surname,
            lastname: this.lastname,
            birthDate: this.birth_date,
            allergy: this.allergy
        }
    }
    getDataByList() {
        return [this.firstname, this.surname, this.lastname, this.birth_date, this.allergy];
    }
    static fromData(data) {
        return new Patient(data.id, data.firstname, data.surname, data.lastname, data.birth_date, data.allergy);
    }
}