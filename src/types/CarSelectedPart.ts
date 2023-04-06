import CarPart from './CarPart';

export default class CarSelectedPart {
    id: number | null;

    carPart: CarPart;

    count: number;

    constructor(carPart: CarPart, count: number, id: number | null) {
        this.id = id;
        this.carPart = carPart;
        this.count = count;
    }
}
