import CarModel from '../types/CarModel';
import { client } from '../utils/fetchClient';

class CarModelService {
    // eslint-disable-next-line class-methods-use-this
    static getModels() {
        return client.get<CarModel[]>('cars/models');
    }
}

export default CarModelService;
