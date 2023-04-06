import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Authorization from 'src/model/Authorization';
import TextInput from '@avtopro/text-input/dist/index';
import Button from '@avtopro/button/dist/index';
import './AuthForm.scss';

export type Props = {
    authorization: Authorization;
};

export const AuthForm: React.FC<Props> = observer(({ authorization }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [needToRegister, setNeedToRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        authorization.loadUserFromStorage();
    }, []);

    const loadUser = async () => {
        const user = await authorization.getUserByEmail(email);

        if (!user) {
            setNeedToRegister(true);
        }
    };

    // eslint-disable-next-line arrow-body-style
    const registerUser = () => {
        authorization.createUser(email, name);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setErrorMessage('');
        setLoading(true);

        if (needToRegister) {
            await registerUser();
        } else {
            await loadUser();
        }

        setLoading(false);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1 className="login-form__title">
                    {needToRegister
                        ? 'You need to register'
                        : 'Log in to open Car maintenance'}
                </h1>

                <div className="login-form__field">
                    <label
                        className="login-form__field-label"
                        htmlFor="user-email"
                    >
                        Email
                    </label>

                    <div
                        className={classNames('login-form__input-field', {
                            'is-loading': loading,
                        })}
                    >
                        <TextInput
                            type="email"
                            id="user-email"
                            className={classNames('login-form__input', {
                                'is-danger': !needToRegister && errorMessage,
                            })}
                            placeholder="Enter your email"
                            blockSize=""
                            value={email}
                            required
                            disabled={loading || needToRegister}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setEmail(e.target.value)}
                        />

                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope" />
                        </span>
                    </div>

                    {!needToRegister && errorMessage && (
                        <p className="help is-danger">{errorMessage}</p>
                    )}
                </div>

                {needToRegister && (
                    <div className="login-form__field">
                        <label
                            className="login-form__field-label"
                            htmlFor="user-name"
                        >
                            Your Name
                        </label>

                        <div
                            className={classNames('login-form__input-field', {
                                'is-loading': loading,
                            })}
                        >
                            <TextInput
                                type="text"
                                id="user-name"
                                className={classNames('login-form__input', {
                                    'is-danger': needToRegister && errorMessage,
                                })}
                                placeholder="Enter your name"
                                blockSize=""
                                minLength={4}
                                value={name}
                                required
                                disabled={loading}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => setName(e.target.value)}
                            />

                            {/* <input
                                type="text"
                                id="user-name"
                                className={classNames('input', {
                                    'is-danger': needToRegister && errorMessage,
                                })}
                                placeholder="Enter your name"
                                required
                                minLength={4}
                                disabled={loading}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            /> */}

                            <span className="icon is-small is-left">
                                <i className="fas fa-user" />
                            </span>
                        </div>

                        {needToRegister && errorMessage && (
                            <p className="help is-danger">{errorMessage}</p>
                        )}
                    </div>
                )}

                <div className="field">
                    <Button
                        type="submit"
                        theme="prime"
                        uppercase
                        className={classNames('button is-primary', {
                            'is-loading': loading,
                        })}
                    >
                        {needToRegister ? 'Register' : 'Login'}{' '}
                    </Button>
                    {/* <button
                        type="submit"
                        className={classNames('button is-primary', {
                            'is-loading': loading,
                        })}
                    >
                        {needToRegister ? 'Register' : 'Login'}
                    </button> */}
                </div>
            </form>
        </div>
    );
});
