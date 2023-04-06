import React, { FC } from 'react';
import { MaintenanceList } from '../MaintenanceList/MaintenanceList';
import { Toolbar } from '../Toolbar';
import './Main.scss';

// eslint-disable-next-line arrow-body-style
export const Main: FC = () => {
    return (
        <main className="main">
            <Toolbar />
            <MaintenanceList />
        </main>
    );
};
