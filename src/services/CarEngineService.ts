import CarEngine from '../types/CarEngine';
import { client } from '../utils/fetchClient';

class CarEngineService {
    // eslint-disable-next-line class-methods-use-this
    static getEngines(id: number) {
        return client.get<CarEngine[]>(`cars/engines?ModelId=${id}`);
    }
}

export default CarEngineService;
