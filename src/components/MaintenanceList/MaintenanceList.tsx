import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import RobotPreloader from '@avtopro/preloader/dist/index';
import { useModel } from 'src/context/model-context';
import './MaintenanceList.scss';
import Button from '@avtopro/button/dist/index';
import ItemCard from '@avtopro/item-card/dist/index';
import { useAuth } from '../Auth/AuthContext';
import { AddForm } from '../AddForm/AddForm';

export const MaintenanceList: FC = observer(() => {
    const { user } = useAuth();
    const { currenMaintenance, maintenanceList } = useModel();

    const [isAddFormShowed, setAddFormShowed] = useState(false);

    const loadModels = async () => {
        if (user) {
            try {
                maintenanceList.isLoading = true;
                await maintenanceList.loadMaintenanceList(user);
            } finally {
                maintenanceList.isLoading = false;
            }
        }
    };

    useEffect(() => {
        loadModels();
    }, [maintenanceList]);

    return (
        <div className="maintenance-list">
            {maintenanceList.isLoading ? (
                <RobotPreloader fixed />
            ) : (
                maintenanceList.filteredMaintenances.map((mc) => (
                    <ItemCard
                        title={
                            <div className="itemcard__title-block">
                                <h2 className="itemcard__title">
                                    {mc.carModel?.name}
                                </h2>
                                <div className="itemcard__sub-title">
                                    <span>{`${mc.carConfiguration?.code} | `}</span>
                                    <span>{`${mc.distance} km`}</span>
                                </div>
                            </div>
                        }
                        controls={[
                            <Button
                                key={`editbtn-${mc.id}`}
                                type="button"
                                blockSize="sm"
                                theme="link"
                                uppercase
                                className="pro-form__frame__text"
                                onClick={() => {
                                    currenMaintenance.id = mc.id;
                                    currenMaintenance.carModel = mc.carModel;
                                    currenMaintenance.carEngine = mc.carEngine;
                                    currenMaintenance.carConfiguration =
                                        mc.carConfiguration;
                                    currenMaintenance.carParts = mc.carParts;
                                    currenMaintenance.distance = mc.distance;
                                    setAddFormShowed(true);
                                }}
                            >
                                Edit
                            </Button>,
                            <Button
                                key={`deletebtn-${mc.id}`}
                                type="button"
                                blockSize="sm"
                                theme="danger"
                                uppercase
                                className="pro-form__frame__text"
                                onClick={() => {
                                    mc.deleteMaintance(user);
                                    maintenanceList.deleteMaintance(mc);
                                }}
                            >
                                Delete
                            </Button>,
                        ]}
                        key={mc.id}
                    >
                        <div className="itemcard__block maintenance-card__parts">
                            <ul className="maintenance-card__parts-list">
                                {mc.carParts.map((part) => (
                                    <li
                                        className="maintenance-card__parts-item"
                                        key={part.id}
                                    >
                                        {`${part.carPart.code} ${part.carPart.name} (${part.count})`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ItemCard>
                ))
            )}
            {isAddFormShowed && (
                <AddForm setAddFormShowed={setAddFormShowed} isEditMode />
            )}
        </div>
    );
});
