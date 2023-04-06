import { observer } from 'mobx-react-lite';
import React, { createContext, useContext } from 'react';
import Authorization from 'src/model/Authorization';
import { AuthForm } from './AuthForm';

export const AuthContext = createContext<Authorization | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error(
            'You have forgotten to wrap your root component with RootStoreProvider',
        );
    }
    return context;
};

type Props = {
    children: React.ReactNode;
};

const authorization = new Authorization(null);

export const AuthProvider: React.FC<Props> = observer(({ children }) => {
    if (!authorization.user) {
        return <AuthForm authorization={authorization} />;
    }

    return (
        <AuthContext.Provider value={authorization}>
            {children}
        </AuthContext.Provider>
    );
});
