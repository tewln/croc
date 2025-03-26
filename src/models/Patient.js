class Patient {
    constructor(id, firstname, surname, lastname, birth_date, allergy) {
        this.id = id;
        this.firstname = firstname;
        this.surname = surname;
        this.lastname = lastname;
        this.date_of_birth = birth_date;
        this.allergy = allergy;
    }
    async get() {
        return this;
    }
    async setID(id){
        this.id = id;
    }
}

export default Patient;