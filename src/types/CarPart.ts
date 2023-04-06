import { makeObservable, observable } from 'mobx';

export default class CarPart {
    id: number;

    name: string;

    code: string;

    constructor(id: number, name: string, code: string) {
        makeObservable(this, {
            id: observable,
            name: observable,
            code: observable,
        });
        this.id = id;
        this.name = name;
        this.code = code;
    }
}
