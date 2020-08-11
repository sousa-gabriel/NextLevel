import axios from 'axios';

// entranod em contato com a minha base de dados 
const api = axios.create({
    baseURL:'http://localhost:3333',
});

export default api;
