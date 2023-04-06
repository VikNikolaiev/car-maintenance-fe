import React, { FC, useEffect, useState } from 'react';
import './Toolbar.scss';
import TextInput from '@avtopro/text-input/dist/index';
import Button from '@avtopro/button/dist/index';
import PlusIcon from '@avtopro/icons/dist/js/PlusIcon';
import Slider from '@avtopro/slider/dist/index';
import Select, { Option } from '@avtopro/select/dist/index';
import { observer } from 'mobx-react-lite';
import { useModel } from 'src/context/model-context';
import { AddForm } from '../AddForm/AddForm';

export const Toolbar: FC = observer(() => {
    const [isAddFormShowed, setAddFormShowed] = useState(false);
    const [isFiltersShowed, setIsFiltersShowed] = useState(false);
    const { maintenanceList } = useModel();
    const [models, setModels] = useState<string[]>([]);
    const [minDistance, setMinDistance] = useState<number>();
    const [maxDistance, setMaxDistance] = useState<number>();

    useEffect(() => {
        setModels([
            ...new Set(
                maintenanceList.maintenances.map(
                    (item) => item.carModel?.name as string,
                ),
            ),
        ]);
        setMinDistance(
            maintenanceList.maintenances.reduce((acc, item) => {
                if (acc < item.distance) {
                    return acc;
                }
                return item.distance;
            }, 0),
        );

        setMaxDistance(
            maintenanceList.maintenances.reduce((acc, item) => {
                if (acc > item.distance) {
                    return acc;
                }
                return item.distance;
            }, 0),
        );
    }, [maintenanceList.maintenances]);

    // eslint-disable-next-line no-console
    console.log('render');

    return (
        <div className="toolbar">
            <div className="toolbar__options">
                <TextInput
                    className="pro-form__control"
                    placeholder="Enter List Title"
                    blockSize=""
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        maintenanceList.modelFilter = e.target.value;
                    }}
                />
                <Button
                    type="button"
                    theme="blue"
                    uppercase
                    className="pro-form__frame__text"
                    onClick={() => {
                        setAddFormShowed(true);
                    }}
                >
                    <i className="pro-icon-inline">
                        <PlusIcon />
                    </i>
                </Button>
                <Button
                    type="button"
                    theme="inverse"
                    uppercase
                    className="pro-form__frame__text"
                    onClick={() => {
                        setIsFiltersShowed((value) => {
                            if (value === true) {
                                maintenanceList.modelFilter = '';
                                maintenanceList.minDistanceFilter = null;
                                maintenanceList.maxDistanceFilter = null;
                            }
                            return !value;
                        });
                    }}
                >
                    Filter
                </Button>
            </div>
            {isFiltersShowed && (
                <div className="toolbar__filters">
                    <Slider
                        ariaLabel={['Lower', 'Upper']}
                        defaultValue={[minDistance, maxDistance]}
                        min={minDistance}
                        max={maxDistance}
                        pearling
                        onChange={([lower, upper]: number[]) => {
                            maintenanceList.minDistanceFilter = lower;
                            maintenanceList.maxDistanceFilter = upper;
                        }}
                    />
                    <Select
                        placeholder="Select Model"
                        onChange={(_name: string, value: string[]) => {
                            // eslint-disable-next-line prefer-destructuring
                            maintenanceList.modelFilter = value[0];
                        }}
                    >
                        {models.map((mts: string) => (
                            <Option key={`search-${mts}`} value={mts}>
                                {mts}
                            </Option>
                        ))}
                    </Select>
                </div>
            )}
            {isAddFormShowed && <AddForm setAddFormShowed={setAddFormShowed} />}
        </div>
    );
});
