import { client } from '../utils/fetchClient';
import { VehicleVariableAnswear } from '../types/VehicleVariable';

export const getVehicleVariables = () =>
    client.get<VehicleVariableAnswear>(
        '/vehicles/getvehiclevariablelist?format=json'
    );
