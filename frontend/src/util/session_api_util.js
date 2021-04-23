import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const signup = (userData) => {
    return axios.post('/api/users/signup', userData);
};

export const login = (userData) => {
    return axios.post('/api/users/login', userData);
};

export const update = (userData) => (
    axios.patch(`/api/users/${userData.id}`, userData)
)

export const getUser = userId => (
    axios.get(`/api/users/${userId}`)
)