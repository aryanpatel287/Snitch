import axios from 'axios';

const authApiInstance = axios.create({
  baseURL: '/api/auth',
  withCredentials: true,
});

export async function registerUser({
  email,
  password,
  contact,
  fullname,
  isSeller,
}) {
  try {
    const response = await authApiInstance.post('/register', {
      email,
      password,
      contact,
      fullname,
      isSeller,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await authApiInstance.post('/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function googleAuth() {
  window.location.assign('/api/auth/google');
}

export async function getMe() {
  try {
    const response = await authApiInstance.get('/get-me');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await authApiInstance.post('/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function forgotPassword({ email }) {
  try {
    const response = await authApiInstance.post('/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function resetPassword({ password, token }) {
  try {
    const response = await authApiInstance.patch(
      '/update-password?token=' + token,
      { password },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
