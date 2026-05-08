import axios from 'axios';

const authApiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_SERVER_URL}/api/auth`,
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
