import axios from 'axios';


/* 发起普通http请求 */
const axiosInst = axios.create({
    timeout: 5000,
    maxRedirects: 5,
    // headers:{
        // "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        // "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        // "Origin": "https://www.xiaohongshu.com",
        // "Referer": "https://www.xiaohongshu.com",
        // "Content-Type": "application/json;charset=UTF-8"
    // }
});
  
axiosInst.interceptors.request.use(
    (config) => {
      Object.assign(config.headers);
      console.log(config)
      return config;
    },
    (error) => Promise.reject(error)
);
  
axiosInst.interceptors.response.use(
    (response) => {
        // response.data
        console.log(response)
        return response.data
    },
    (error) => Promise.reject(error)
);
  
const request = (config) => axiosInst.request(config);


export const Get = async (url) => {
    const result = await request({
        method: 'GET',
        url: url,
    });
    console.log(result)
    return result
}



