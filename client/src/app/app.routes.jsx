import { createBrowserRouter } from 'react-router';
import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import ForgotPassword from '../features/auth/pages/ForgotPassword';
import ResetPassword from '../features/auth/pages/ResetPassword';
import CreateProduct from '../features/products/pages/CreateProduct';
import NotFoundPage from '../features/shared/pages/NotFoundPage';
import ForbiddenPage from '../features/shared/pages/ForbiddenPage';
import SellerProtectedPage from '../features/auth/components/SellerProtectedPage';
import ProtectedPage from '../features/auth/components/ProtectedPage';
import UserProfile from '../features/user/pages/UserProfile';
import LandingPage from '../features/landing/pages/LandingPage';

export const appRoutes = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/profile',
        element: (
            <ProtectedPage>
                <UserProfile />
            </ProtectedPage>
        ),
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/reset-password',
        element: <ResetPassword />,
    },
    {
        path: '/seller/create-product',
        element: (
            <SellerProtectedPage>
                <CreateProduct />
            </SellerProtectedPage>
        ),
    },
    { path: '*', element: <NotFoundPage /> },
    { path: '/forbidden', element: <ForbiddenPage /> },
]);
