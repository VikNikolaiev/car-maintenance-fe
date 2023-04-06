import { createContext, useContext } from 'react';
import Model from 'src/model';

export const ModelContext = createContext<Model | null>(null);

export const useModel = () => {
    const context = useContext(ModelContext);
    if (context === null) {
        throw new Error(
            'You have forgotten to wrap your root component with RootStoreProvider',
        );
    }
    return context;
};
