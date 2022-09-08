
import axios from 'axios';
// import constant from '@/common/constant.js';

const instance = axios.create({
    baseURL: import.meta.env.VITE_DEVELOPMENT_API_URL,
});

instance.interceptors.request.use(
    function (config) {
        console.log('config >>>', config);
        return config;
    },
    function (error) {
        return error;
    }
);

instance.interceptors.response.use(
    function (response) {
        console.log('response >>>', response.data.resultVO);
        return response;
    },
    function (error) {
        // return Promise.reject(error);
        return error;
    }
);

export default instance;