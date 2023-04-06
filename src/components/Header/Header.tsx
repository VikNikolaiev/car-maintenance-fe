import React from 'react';
import './Header.scss';
import { Logo } from 'src/assets/icons/Logo';
import Button from '@avtopro/button/dist/index';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../Auth/AuthContext';

// eslint-disable-next-line arrow-body-style
export const Header = observer(() => {
    const { user, logOut } = useAuth();

    return (
        <header className="header">
            <div className="header__title">
                <a className="logo" href="/">
                    <Logo />
                </a>
                <h1 className="title">Car Maintenance</h1>
            </div>
            {user && (
                <div className="header__user">
                    <span>Hello, </span>
                    <span>{user.fullName}</span>
                    <Button
                        type="submit"
                        theme="youtube"
                        blockSize="sm"
                        uppercase
                        className="pro-form__frame__text"
                        onClick={() => {
                            logOut();
                        }}
                    >
                        Log Out
                    </Button>
                </div>
            )}
        </header>
    );
});
