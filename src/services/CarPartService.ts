import CarPart from '../types/CarPart';
import { client } from '../utils/fetchClient';

class CarPartService {
    // eslint-disable-next-line class-methods-use-this
    static getParts(modelId: number, query: string) {
        return client.get<CarPart[]>(
            `cars/parts?PartGroupId=${modelId}&SearchText=${query}`,
        );
    }
}
export default CarPartService;
