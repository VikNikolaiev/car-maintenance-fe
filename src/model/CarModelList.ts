import {
    makeObservable,
    observable,
    action,
    computed,
    runInAction,
} from 'mobx';
import CarModelService from 'src/services/CarModelServices';
import CarModel from '../types/CarModel';

export default class CarModelList {
    private _models: CarModel[];

    constructor() {
        makeObservable(this, {
            _models: observable,
            loadCarModelList: action,
            models: computed,
        } as never);
        this._models = [];
    }

    // eslint-disable-next-line class-methods-use-this
    async loadCarModelList() {
        const models = await CarModelService.getModels();

        runInAction(() => {
            this._models = [];
            models.forEach((model) =>
                this._models.push(new CarModel(model.id, model.name)),
            );
        });
    }

    get models() {
        return this._models;
    }
}
