import { useEffect } from 'react';
import { useAuth } from '../hook/useAuth';

/**
 * AppInitializer — fires a single global session hydration on app boot.
 * This component is the ONLY place that calls handleGetMe().
 * All guards (ProtectedPage, SellerProtectedPage) and UI components
 * (SessionUser) simply read from Redux state — they never fetch.
 */
const AppInitializer = ({ children }) => {
    const { handleGetMe } = useAuth();

    useEffect(() => {
        handleGetMe();
    }, []);

    return children;
};

export default AppInitializer;
