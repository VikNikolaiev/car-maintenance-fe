export default class User {
    id: number;

    fullName: string;

    email: string;

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.fullName = name;
        this.email = email;
    }
}
