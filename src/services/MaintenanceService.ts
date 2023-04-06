import Maintenance from 'src/model/Maintenance';
import User from 'src/types/User';
import { client } from 'src/utils/fetchClient';

export default class MaintenanceService {
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

        return client.patch<Maintenance>(
            `maintenances/${existMaintenance.id}`,
            maintenanceToPatch,
            {
                Authorization: user.email,
            },
        );
    }

    static deleteMaintenance(user: User, maintenance: Maintenance) {
        return client.delete(`maintenances/${maintenance.id}`, {
            Authorization: user.email,
        });
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

        // console.log(maintenanceToPost);
        return client.post<Maintenance>('maintenances', maintenanceToPost, {
            Authorization: user.email,
        });
    }
}
