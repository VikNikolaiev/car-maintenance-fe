import {
    makeObservable,
    observable,
    action,
    computed,
    runInAction,
} from 'mobx';
import CarPartService from 'src/services/CarPartService';
import CarPart from '../types/CarPart';

export default class CarPartList {
    private _parts: CarPart[];

    constructor() {
        makeObservable(this, {
            _parts: observable,
            loadCarPartList: action,
            parts: computed,
            clear: action,
        } as never);
        this._parts = [];
    }

    // eslint-disable-next-line class-methods-use-this
    async loadCarPartList(modelId: number, query: string) {
        const parts = await CarPartService.getParts(modelId, query);

        runInAction(() => {
            this._parts = [];
            parts.forEach((part) =>
                this._parts.push(new CarPart(part.id, part.name, part.code)),
            );
        });
    }

    get parts() {
        return this._parts;
    }

    clear() {
        this._parts = [];
    }
}
