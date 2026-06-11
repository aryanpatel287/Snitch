import React from 'react';
import './app.scss';
import { RouterProvider } from 'react-router';
import { appRoutes } from './app.routes';
import AppInitializer from '../features/auth/components/AppInitializer';

const App = () => {
    return (
        <AppInitializer>
            <RouterProvider router={appRoutes} />
        </AppInitializer>
    );
};

export default App;
