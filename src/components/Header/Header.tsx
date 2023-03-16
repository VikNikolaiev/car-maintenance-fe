import React, { FC } from 'react';
import './Header.scss';
import { Logo } from 'src/assets/icons/Logo';

import { PageNavLink } from '../PageNavLink';

export const Header: FC = () => (
    <header className="header">
        <a className="logo" href="/">
            <Logo />
        </a>

        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__item">
                    <PageNavLink to="/" text="HomePage" />
                </li>
                <li className="nav__item">
                    <PageNavLink to="/variables" text="Vehicle Variables" />
                </li>
            </ul>
        </nav>
    </header>
);
