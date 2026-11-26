import axios from 'axios';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const AUTH_TOKEN_KEY = 'six-cities-token';

export const createAPI = () =>
  axios.create({
    baseURL: BACKEND_URL,
    timeout: 5000,
    headers: {
      'X-Token': localStorage.getItem(AUTH_TOKEN_KEY) ?? '',
    },
  });
