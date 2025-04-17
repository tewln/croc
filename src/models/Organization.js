export class Organization {
    constructor(id, name, pid) {
        this.id = id;
        this.name = name;
        this.pid = pid;
    }
    getDataByList() {
        return [this.id, this.name, this.pid];
    }
    static fromData(data) {
        return new Organization(data.id, data.name, data.pid);
    }
}