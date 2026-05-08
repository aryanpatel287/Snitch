import { setUser, setLoading, setError } from '../state/auth.slice';
import { registerUser, loginUser } from '../service/auth.api';
import { useDispatch } from 'react-redux';

export const useAuth = () => {
    const dispatch = useDispatch();

    async function handleRegister({
        email,
        password,
        contact,
        fullname,
        isSeller = false,
    }) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await registerUser({
                email,
                password,
                contact,
                fullname,
                isSeller,
            });
            dispatch(setUser(data.user));
        } catch (error) {
            console.log(error);
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await loginUser({ email, password });
            dispatch(setUser(data.user));
        } catch (error) {
            console.log(error);
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleRegister, handleLogin };
};
