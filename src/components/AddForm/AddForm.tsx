import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useModel } from 'src/context/model-context';
import NumberInput from '@avtopro/number-input/dist/index';
import Modal from '@avtopro/modal/dist/index';
import Select, { Option } from '@avtopro/select/dist/index';
import AddRashodIcon from '@avtopro/icons/dist/js/AddRashodIcon';
import PlusIcon from '@avtopro/icons/dist/js/PlusIcon';
import Button from '@avtopro/button/dist/index';
import CarSelectedPart from 'src/types/CarSelectedPart';
import CarModel from 'src/types/CarModel';
import CarEngine from 'src/types/CarEngine';
import Maintenance from 'src/model/Maintenance';
import CarConfiguration from 'src/types/CarConfiguration';
import CarPart from '../../types/CarPart';
import { useAuth } from '../Auth/AuthContext';
import './AddForm.scss';

type Props = {
    setAddFormShowed: (toggler: boolean) => void;
    isEditMode?: boolean;
};

export const AddForm: FC<Props> = observer(
    ({ setAddFormShowed, isEditMode = false }) => {
        const { user } = useAuth();
        const {
            carModels,
            carEngines,
            carConfigurations,
            carParts,
            maintenanceList,
            currenMaintenance,
        } = useModel();

        const [newPartGroupId, setNewPartGroupId] = useState<number>(0);
        const [newPart, setNewPart] = useState<CarPart | null>(null);
        const [partQuery, setPartQuery] = useState('');
        const [partCounter, setPartCounter] = useState(1);

        const loadModels = async () => {
            await carModels.loadCarModelList();
        };

        const loadEngines = async (modelId: number) => {
            await carEngines.loadCarEngineList(modelId);
        };

        const loadConfigurations = async (
            modelId: number,
            engineId: number,
        ) => {
            await carConfigurations.loadCarConfigurationList(modelId, engineId);
        };

        const loadParts = async (partGroupId: number, query: string) => {
            await carParts.loadCarPartList(partGroupId, query);
        };

        useEffect(() => {
            if (carModels.models.length === 0) {
                loadModels();
            }
        }, [carModels]);

        useEffect(() => {
            if (isEditMode) {
                try {
                    currenMaintenance.carConfiguration?.loadPartGroups();
                } catch {
                    Error('Error loading part groups');
                }
            }
        }, [currenMaintenance.carConfiguration, currenMaintenance.id]);

        const addPartHandler = () => {
            if (newPart) {
                const findIndex = currenMaintenance.carParts.findIndex(
                    (part) => part.carPart.id == newPart.id,
                );

                if (findIndex >= 0) {
                    currenMaintenance.carParts[findIndex].count += partCounter;
                    currenMaintenance.carParts = [
                        ...currenMaintenance.carParts,
                    ];
                } else {
                    currenMaintenance.carParts.push(
                        new CarSelectedPart(newPart, partCounter, null),
                    );
                }
            }
        };

        const submitFormHandler = async (
            e: React.FormEvent<HTMLFormElement>,
        ) => {
            e.preventDefault();
            try {
                const newMaint = new Maintenance(
                    currenMaintenance.carModel,
                    currenMaintenance.carEngine,
                    currenMaintenance.carConfiguration,
                    currenMaintenance.carParts,
                    currenMaintenance.distance,
                    currenMaintenance.id,
                );

                if (!isEditMode) {
                    // await newMaint.createMaintenance(user);
                    maintenanceList.addMaintance(newMaint, user);
                }

                if (isEditMode) {
                    maintenanceList.updateMaintance(newMaint, user);
                    // newMaint.updateMaintenance(user);
                }
            } catch {
                Error('Error adding maintance');
            } finally {
                // maintenanceList.loadMaintenanceList(user as User);
                setAddFormShowed(false);
            }
        };

        return (
            <Modal
                closeOnClick
                theme="danger"
                onClose={() => {
                    if (isEditMode) {
                        currenMaintenance.clear();
                    }
                    setAddFormShowed(false);
                }}
            >
                <div className="modwin__caption">
                    <i className="pro-icon-inline">
                        <AddRashodIcon />
                    </i>
                    {isEditMode ? 'Edit List' : 'New List'}
                </div>
                <hr />
                <form
                    className="modwin__container"
                    onSubmit={submitFormHandler}
                >
                    <div className="modwin__model">
                        <Select
                            className="modwin__model-item"
                            placeholder="Model"
                            defaultValue={
                                isEditMode ? currenMaintenance.carModel : null
                            }
                            disabled={isEditMode}
                            value={
                                currenMaintenance.carModel
                                    ? currenMaintenance.carModel
                                    : null
                            }
                            onChange={(_name: string, value: CarModel[]) => {
                                currenMaintenance.carEngine = null;
                                carEngines.clear();
                                currenMaintenance.carConfiguration = null;
                                carConfigurations.clear();
                                currenMaintenance.distance = 0;
                                currenMaintenance.carConfiguration = null;
                                currenMaintenance.carParts = [];
                                carParts.clear();
                                setPartCounter(1);
                                // eslint-disable-next-line prefer-destructuring
                                currenMaintenance.carModel = value[0];
                                loadEngines(currenMaintenance.carModel.id);
                            }}
                        >
                            {isEditMode ? (
                                <Option
                                    key={currenMaintenance.carModel?.id}
                                    value={currenMaintenance.carModel}
                                >
                                    {currenMaintenance.carModel?.name}
                                </Option>
                            ) : (
                                carModels.models.map((curModel) => (
                                    <Option key={curModel.id} value={curModel}>
                                        {curModel.name}
                                    </Option>
                                ))
                            )}
                        </Select>
                        <Select
                            className="modwin__model-item"
                            placeholder="Engine"
                            defaultValue={
                                isEditMode ? currenMaintenance.carEngine : null
                            }
                            value={
                                currenMaintenance.carEngine
                                    ? currenMaintenance.carEngine
                                    : null
                            }
                            disabled={isEditMode || !currenMaintenance.carModel}
                            onChange={(_: string, value: CarEngine[]) => {
                                // eslint-disable-next-line prefer-destructuring
                                currenMaintenance.carEngine = value[0];
                                if (currenMaintenance.carModel) {
                                    loadConfigurations(
                                        currenMaintenance.carModel.id,
                                        value[0].id,
                                    );
                                }
                            }}
                        >
                            {isEditMode ? (
                                <Option
                                    key={currenMaintenance.carEngine?.id}
                                    value={currenMaintenance.carEngine}
                                >
                                    {currenMaintenance.carEngine?.name}
                                </Option>
                            ) : (
                                carEngines.engines.map((engine) => (
                                    <Option key={engine.id} value={engine}>
                                        {engine.name}
                                    </Option>
                                ))
                            )}
                        </Select>
                        <Select
                            className="modwin__model-item"
                            placeholder="Configuration"
                            defaultValue={
                                isEditMode
                                    ? currenMaintenance.carConfiguration
                                    : null
                            }
                            value={
                                currenMaintenance.carConfiguration
                                    ? currenMaintenance.carConfiguration
                                    : null
                            }
                            disabled={
                                isEditMode || !currenMaintenance.carEngine
                            }
                            onChange={(
                                _name: string,
                                value: CarConfiguration[],
                            ) => {
                                // eslint-disable-next-line prefer-destructuring
                                currenMaintenance.carConfiguration = value[0];
                            }}
                        >
                            {isEditMode ? (
                                <Option
                                    key={currenMaintenance.carConfiguration?.id}
                                    value={currenMaintenance.carConfiguration}
                                >
                                    {currenMaintenance.carConfiguration?.code}
                                </Option>
                            ) : (
                                carConfigurations.configurations.map((conf) => (
                                    <Option key={conf.id} value={conf}>
                                        {conf.code}
                                    </Option>
                                ))
                            )}
                        </Select>
                        <NumberInput
                            className="modwin__model-item"
                            placeholder="Enter distance"
                            blockSize=""
                            disabled={!currenMaintenance.carConfiguration}
                            value={currenMaintenance.distance}
                            min={0}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                currenMaintenance.distance = +e.target.value;
                            }}
                        />
                    </div>
                    <hr />
                    <div className="modwin__part">
                        <Select
                            className="modwin__part-group"
                            placeholder="Select part group"
                            disabled={!currenMaintenance.carConfiguration}
                            onChange={(_name: string, value: number) => {
                                setNewPartGroupId(value);
                                carParts.clear();
                                setPartQuery('');
                            }}
                        >
                            {currenMaintenance.carConfiguration?.partGroups.map(
                                (group) => (
                                    <Option key={group.id} value={group.id}>
                                        {group.name}
                                    </Option>
                                ),
                            )}
                        </Select>
                        <Select
                            className="modwin__part-name"
                            placeholder="Enter part name..."
                            searchable
                            disabled={!newPartGroupId}
                            query={partQuery}
                            onChange={(_name: string, value: CarPart[]) => {
                                setPartQuery('');
                                setNewPart(value[0]);
                            }}
                            onQueryChange={(value: string) => {
                                setPartQuery(value);
                                if (value.length > 2) {
                                    loadParts(newPartGroupId, value);
                                }
                            }}
                        >
                            {carParts.parts.map((part: CarPart) => (
                                <Option key={part.id} value={part}>
                                    {`${part.id} ${part.name}`}
                                </Option>
                            ))}
                        </Select>
                        <NumberInput
                            className="modwin__part-count"
                            placeholder="Count"
                            blockSize=""
                            disabled={!newPart}
                            value={partCounter}
                            min={1}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setPartCounter(+e.target.value)}
                        />
                        <Button
                            type="button"
                            theme="blue"
                            uppercase
                            disabled={!newPart}
                            className="modwin__part-addbtn"
                            onClick={addPartHandler}
                        >
                            <i className="pro-icon-inline">
                                <PlusIcon />
                            </i>
                        </Button>
                        <div className="modwin__part-added">
                            <ul className="modwin__part-list">
                                {currenMaintenance.carParts.map((part) => (
                                    <li
                                        key={part.carPart.id}
                                        className="modwin__part-item"
                                    >
                                        {`${part.carPart.code} ${part.carPart.name} (${part.count})`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <br />
                    <div className="modwin__controls">
                        <Button
                            type="button"
                            theme="inverse"
                            uppercase
                            onClick={() => {
                                currenMaintenance.clear();
                                setAddFormShowed(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" theme="prime" uppercase>
                            {isEditMode ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </Modal>
        );
    },
);
