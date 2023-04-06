import { makeObservable, observable } from 'mobx';

export default class CarEngine {
    id: number;

    name: string;

    constructor(id: number, title: string) {
        makeObservable(this, {
            id: observable,
            name: observable,
        });
        this.id = id;
        this.name = title;
    }
}
