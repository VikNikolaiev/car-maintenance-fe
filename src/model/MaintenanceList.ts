import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from 'mobx';
import MaintenanceListService from 'src/services/MaintenanceListServise';

import Maintenance from './Maintenance';
import User from '../types/User';

export default class MaintenanceList {
    private _maintenanceList: Maintenance[];

    modelFilter: string;

    minDistanceFilter: number | null;

    maxDistanceFilter: number | null;

    isLoading: boolean;

    constructor() {
        makeObservable(this, {
            _maintenanceList: observable,
            isLoading: observable,
            modelFilter: observable,
            minDistanceFilter: observable,
            maxDistanceFilter: observable,
            maintenances: computed,
            filteredMaintenances: computed,
            addMaintance: action.bound,
            loadMaintenanceList: action.bound,
            deleteMaintance: action.bound,
        } as never);
        this._maintenanceList = [];
        this.modelFilter = '';
        this.minDistanceFilter = null;
        this.maxDistanceFilter = null;
        this.isLoading = false;
    }

    get maintenances() {
        return this._maintenanceList;
    }

    get filteredMaintenances() {
        return this._maintenanceList
            .filter((mtc) =>
                mtc.carModel?.name
                    .toLowerCase()
                    .includes(this.modelFilter.toLowerCase()),
            )
            .filter(
                (mtc) =>
                    mtc.distance >= (this.minDistanceFilter || 0) &&
                    mtc.distance <= (this.maxDistanceFilter || 100000000000),
            );
    }

    async addMaintance(newMaintance: Maintenance, user: User | null) {
        this.isLoading = true;

        if (!user || !newMaintance) {
            throw Error('User or maintance is null');
        }

        try {
            const addedMaintance = await MaintenanceListService.createMaintance(
                newMaintance,
                user,
            );
            this._maintenanceList.push(addedMaintance);
        } catch {
            throw Error('Error while adding maintance');
        } finally {
            this.isLoading = false;
        }
    }

    async updateMaintance(currentMaintance: Maintenance, user: User | null) {
        this.isLoading = true;

        if (!user || !currentMaintance) {
            throw Error('User or maintance is null');
        }

        try {
            const udpatedMaintance =
                await MaintenanceListService.updateMaintance(
                    currentMaintance,
                    user,
                );
            this._maintenanceList = this._maintenanceList.map((mts) => {
                if (mts.id === udpatedMaintance.id) {
                    return udpatedMaintance;
                }
                return mts;
            });
        } catch {
            throw Error('Error while adding maintance');
        } finally {
            this.isLoading = false;
        }
    }

    deleteMaintance(maintance: Maintenance) {
        this._maintenanceList = this._maintenanceList.filter(
            (mtc) => mtc.id !== maintance.id,
        );
    }

    async loadMaintenanceList(user: User) {
        const maintenances = await MaintenanceListService.getMaintenances(user);

        runInAction(() => {
            this._maintenanceList = [];
            maintenances.forEach((mtc) => this._maintenanceList.push(mtc));
        });
    }
}
