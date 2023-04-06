import CarConfiguration from 'src/types/CarConfiguration';
import CarEngine from '../types/CarEngine';
import CarModel from '../types/CarModel';
import CarPart from '../types/CarPart';
import CarSelectedPart from '../types/CarSelectedPart';
import Maintenance from '../model/Maintenance';
import User from '../types/User';
import { client } from '../utils/fetchClient';

type PartFromServer = {
    id: number;
    partId: number;
    partName: string;
    partCode: string;
    count: number;
};

type MaintenanceFromServer = {
    id: number;
    modelId: number;
    modelName: string;
    engineId: number;
    engineName: string;
    configurationId: 0;
    configurationCode: string;
    distance: number;
    parts: PartFromServer[];
};

type MaintenancesFromServer = MaintenanceFromServer[];

class MaintenanceListService {
    static parseMaintenanceFromServer(mtcFromServer: MaintenanceFromServer) {
        return new Maintenance(
            new CarModel(mtcFromServer.modelId, mtcFromServer.modelName),
            new CarEngine(mtcFromServer.engineId, mtcFromServer.engineName),
            new CarConfiguration(
                mtcFromServer.configurationId,
                mtcFromServer.configurationCode,
                [],
            ),
            mtcFromServer.parts.map(
                (pfs) =>
                    new CarSelectedPart(
                        new CarPart(pfs.partId, pfs.partName, pfs.partCode),
                        pfs.count,
                        pfs.id,
                    ),
            ),
            mtcFromServer.distance,
            mtcFromServer.id,
        );
    }

    static getMaintenances(user: User) {
        return client
            .get<MaintenancesFromServer>('maintenances', {
                Authorization: user.email,
            })
            .then((response) =>
                response.map((r: MaintenanceFromServer) =>
                    MaintenanceListService.parseMaintenanceFromServer(r),
                ),
            );
    }

    static createMaintance(newMaintenance: Maintenance, user: User) {
        const maintenanceToPost = {
            modelId: newMaintenance?.carModel?.id,
            engineId: newMaintenance?.carEngine?.id,
            configurationId: newMaintenance?.carConfiguration?.id,
            distance: newMaintenance.distance,
            parts: newMaintenance.carParts.map((part) => ({
                partId: part.carPart.id,
                count: part.count,
            })),
        };

        return client
            .post<MaintenanceFromServer>('maintenances', maintenanceToPost, {
                Authorization: user.email,
            })
            .then((response) =>
                MaintenanceListService.parseMaintenanceFromServer(response),
            );
    }

    static updateMaintance(existMaintenance: Maintenance, user: User) {
        const maintenanceToPatch = {
            modelId: existMaintenance?.carModel?.id,
            engineId: existMaintenance?.carEngine?.id,
            configurationId: existMaintenance?.carConfiguration?.id,
            distance: existMaintenance.distance,
            parts: existMaintenance?.carParts.map((part) => ({
                id: part.id,
                partId: part.carPart.id,
                count: part.count,
            })),
        };

        return client
            .patch<MaintenanceFromServer>(
                `maintenances/${existMaintenance.id}`,
                maintenanceToPatch,
                {
                    Authorization: user.email,
                },
            )
            .then((response) =>
                MaintenanceListService.parseMaintenanceFromServer(response),
            );
    }
}
export default MaintenanceListService;
