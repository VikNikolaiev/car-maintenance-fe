import {
    makeObservable,
    observable,
    action,
    computed,
    runInAction,
} from 'mobx';
import CarConfigurationService from '../services/CarConfigurationService';
import CarConfiguration from '../types/CarConfiguration';

export default class CarConfigurationList {
    private _configurations: CarConfiguration[];

    constructor() {
        makeObservable(this, {
            _configurations: observable,
            loadCarConfigurationList: action,
            configurations: computed,
            getPartGroupsByConf: action,
            clear: action,
        } as never);
        this._configurations = [];
    }

    // eslint-disable-next-line class-methods-use-this
    async loadCarConfigurationList(modelId: number, engineId: number) {
        const configurations = await CarConfigurationService.getConfigurations(
            modelId,
            engineId,
        );

        runInAction(() => {
            this._configurations = [];
            configurations.forEach((configuration) =>
                this._configurations.push(
                    new CarConfiguration(
                        configuration.id,
                        configuration.code,
                        configuration.partGroups,
                    ),
                ),
            );
        });
    }

    get configurations() {
        return this._configurations;
    }

    getPartGroupsByConf(configuration: CarConfiguration | null) {
        if (configuration) {
            return (
                this._configurations.find((conf) => conf.id == configuration.id)
                    ?.partGroups || []
            );
        }
        return [];
    }

    clear() {
        this._configurations = [];
    }
}
