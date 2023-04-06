import {
    makeObservable,
    observable,
    action,
    computed,
    runInAction,
} from 'mobx';
import CarEngineService from '../services/CarEngineService';
import CarEngine from '../types/CarEngine';

export default class CarEngineList {
    private _engines: CarEngine[];

    constructor() {
        makeObservable(this, {
            _engines: observable,
            loadCarEngineList: action,
            engines: computed,
            clear: action,
        } as never);
        this._engines = [];
    }

    // eslint-disable-next-line class-methods-use-this
    async loadCarEngineList(modelId: number) {
        const engines = await CarEngineService.getEngines(modelId);

        runInAction(() => {
            this._engines = [];
            engines.forEach((engine) =>
                this._engines.push(new CarEngine(engine.id, engine.name)),
            );
        });
    }

    get engines() {
        return this._engines;
    }

    clear() {
        this._engines = [];
    }
}
