import React from 'react';
import { createRoot } from 'react-dom/client';
// import { HashRouter as Router } from 'react-router-dom';
import '@avtopro/button/dist/style.css';
import '@avtopro/text-input/dist/style.css';
import '@avtopro/select/dist/style.css';
import '@avtopro/preloader/dist/style.css';
import '@avtopro/modal/dist/style.css';
import '@avtopro/slider/dist/style.css';
import '@avtopro/number-input/dist/style.css';
import '@avtopro/item-card/dist/style.css';
import './index.scss';
import { App } from './App';
import { AuthProvider } from './components/Auth/AuthContext';
import { ModelContext } from './context/model-context';
import Model from './model';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
    <AuthProvider>
        <ModelContext.Provider value={new Model()}>
            <App />
        </ModelContext.Provider>
    </AuthProvider>,
);
