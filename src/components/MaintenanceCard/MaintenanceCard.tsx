import React, { FC, useState } from 'react';
import './MaintenanceCard.scss';
import Button from '@avtopro/button/dist/index';
import Maintenance from 'src/model/Maintenance';
import { useModel } from 'src/context/model-context';
import ItemCard from '@avtopro/item-card/dist/index';
import { AddForm } from '../AddForm/AddForm';
import { useAuth } from '../Auth/AuthContext';

type Props = {
    mc: Maintenance;
};

// eslint-disable-next-line arrow-body-style
export const MaintenanceCard: FC<Props> = ({ mc }) => {
    const [isAddFormShowed, setAddFormShowed] = useState(false);
    const { currenMaintenance, maintenanceList } = useModel();
    const { user } = useAuth();

    return (
        // <div className="maintenance-card">
        <div>
            {isAddFormShowed && (
                <AddForm setAddFormShowed={setAddFormShowed} isEditMode />
            )}

            <ItemCard
                title={
                    <div className="itemcard__title-block">
                        <h2 className="itemcard__title">{mc.carModel?.name}</h2>
                        <div className="itemcard__sub-title">
                            <span>{mc.carConfiguration?.code}</span>
                            <span>{mc.distance}</span>
                        </div>
                    </div>
                }
                controls={[
                    <Button
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
        </div>
    );
};
