import axios from 'axios';

const axiosInst = axios.create({
  baseURL: 'http://127.0.0.1:4001',
  timeout: 5000,
});

axiosInst.interceptors.request.use(
  (config) => {
    Object.assign(config.headers, {
      Authorization: localStorage.getItem('accessToken'),
    });

    console.log(`从浏览器里拿出token：${localStorage.getItem('accessToken')}`);
    // console.log(config);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInst.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

const request = (config) => axiosInst.request(config);

export default request;
