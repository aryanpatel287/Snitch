import { createBrowserRouter } from 'react-router';
import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import ForgotPassword from '../features/auth/pages/ForgotPassword';
import ResetPassword from '../features/auth/pages/ResetPassword';

export const appRoutes = createBrowserRouter([
    { path: '/', element: <h1>Hello at home</h1> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/reset-password', element: <ResetPassword /> },
    { path: '*', element: <h1>404 Not Found</h1> },
]);
