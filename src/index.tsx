import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import '@avtopro/button/dist/style.css';
import '@avtopro/text-input/dist/style.css';
import '@avtopro/select/dist/style.css';
import '@avtopro/preloader/dist/style.css';
import '@avtopro/modal/dist/style.css';
import './index.scss';
import { App } from './App';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement); // createRoot(container!) if you use TypeScript
root.render(
    <Router>
        <App />
    </Router>,
);
