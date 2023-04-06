import CarConfigurationList from './CarConfigurationList';
import CarEngineList from './CarEngineList';
import CarModelList from './CarModelList';
import CarPartList from './CarPartsList';
import Maintenance from './Maintenance';
import MaintenanceList from './MaintenanceList';

export default class Model {
    public carModels: CarModelList;

    public carEngines: CarEngineList;

    public carConfigurations: CarConfigurationList;

    public carParts: CarPartList;

    public maintenanceList: MaintenanceList;

    public currenMaintenance: Maintenance;

    constructor() {
        this.carModels = new CarModelList();
        this.carEngines = new CarEngineList();
        this.carConfigurations = new CarConfigurationList();
        this.carParts = new CarPartList();
        this.maintenanceList = new MaintenanceList();
        this.currenMaintenance = new Maintenance(null, null, null, [], 0, 0);
    }
}
