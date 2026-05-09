import { setUser, setLoading, setError } from '../state/auth.slice';
import {
  registerUser,
  loginUser,
  googleAuth,
  getMe,
  logoutUser,
  forgotPassword,
  resetPassword,
} from '../service/auth.api';
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

  async function handleGetMe() {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  function handleGoogleAuth() {
    googleAuth();
  }

  async function handleLogout() {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      await logoutUser();
      dispatch(setUser(null));
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleForgotPassword({ email }) {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      await forgotPassword({ email });
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleResetPassword({ token, password }) {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      await resetPassword({ token, password });
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleGoogleAuth,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
  };
};
