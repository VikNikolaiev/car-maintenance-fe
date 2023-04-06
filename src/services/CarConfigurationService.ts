import CarConfiguration, { PartGroup } from 'src/types/CarConfiguration';
import { client } from '../utils/fetchClient';

class CarEngineService {
    static getPartGroups(id: number) {
        return client.get<PartGroup[]>(`cars/groups?ConfigurationId=${id}`);
    }

    // eslint-disable-next-line class-methods-use-this
    static getConfigurations(modelId: number, engineId: number) {
        return client.get<CarConfiguration[]>(
            `cars/configurations?ModelId=${modelId}&EngineId=${engineId}`,
        );
    }
}

export default CarEngineService;
