import React from 'react';
import './app.scss';
import { RouterProvider } from 'react-router';
import { appRoutes } from './app.routes';

const App = () => {
    return <RouterProvider router={appRoutes} />;
};

export default App;
