import { action, makeObservable, observable } from 'mobx';
import MaintenanceService from 'src/services/MaintenanceService';
import CarConfiguration from '../types/CarConfiguration';
import CarEngine from '../types/CarEngine';
import CarModel from '../types/CarModel';
import CarSelectedPart from '../types/CarSelectedPart';
import User from '../types/User';

export default class Maintenance {
    id: number;

    carModel: CarModel | null;

    carEngine: CarEngine | null;

    carConfiguration: CarConfiguration | null;

    carParts: CarSelectedPart[];

    distance: number;

    constructor(
        carModel: CarModel | null,
        carEngine: CarEngine | null,
        carConfiguration: CarConfiguration | null,
        carParts: CarSelectedPart[],
        distance: number,
        id?: number,
    ) {
        makeObservable(this, {
            id: observable,
            carModel: observable,
            carEngine: observable,
            carConfiguration: observable,
            carParts: observable,
            distance: observable,
            // createMaintenance: action,
            deleteMaintance: action,
            clear: action,
        });
        this.id = id || 0;
        this.carModel = carModel;
        this.carEngine = carEngine;
        this.carConfiguration = carConfiguration;
        this.carParts = carParts;
        this.distance = distance;
    }

    // createMaintenance(user: User | null) {
    //     if (this && user) {
    //         MaintenanceService.createMaintance(this, user);
    //     }
    // }

    updateMaintenance(user: User | null) {
        if (this && user) {
            MaintenanceService.updateMaintance(this, user);
        }
    }

    deleteMaintance(user: User | null) {
        if (this && user) {
            MaintenanceService.deleteMaintenance(user, this);
        }
    }

    clear() {
        this.id = 0;
        this.carModel = null;
        this.carEngine = null;
        this.carConfiguration = null;
        this.carParts = [];
        this.distance = 0;
    }
}
