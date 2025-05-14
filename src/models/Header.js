export class Header {
    constructor(staffName, position, organization, department) {
        this.staffFullName = staffName;
        this.position = position;
        this.organization = organization;
        this.department = department;
    }
    getDataByList() {
        return [this.staffFullName, this.position, this.organization, this.department];
    }
    static fromData(data) {
        return new Header(data.staffFullName, data.position, data.organization, data.department);
    }
}