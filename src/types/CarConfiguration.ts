import { makeObservable, observable } from 'mobx';
import CarConfigurationService from 'src/services/CarConfigurationService';

export type PartGroup = {
    id: number;
    name: string;
};

export default class CarConfiguration {
    id: number;

    code: string;

    partGroups: PartGroup[];

    constructor(id: number, code: string, partGroups: PartGroup[]) {
        makeObservable(this, {
            id: observable,
            code: observable,
            partGroups: observable,
        });
        this.id = id;
        this.code = code;
        this.partGroups = partGroups;
    }

    async loadPartGroups() {
        const loadedPartsGroups = await CarConfigurationService.getPartGroups(
            this.id,
        );
        this.partGroups = loadedPartsGroups;
    }
}
