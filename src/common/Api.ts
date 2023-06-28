import axios from 'axios';

const { AUTENTIQUE_TOKEN, AUTENTIQUE_URL } = process.env;

const Api = (token: string) =>
  axios.create({
    baseURL: AUTENTIQUE_URL || 'https://api.autentique.com.br/v2',
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token || AUTENTIQUE_TOKEN}`,
    },
  });

export default Api;
