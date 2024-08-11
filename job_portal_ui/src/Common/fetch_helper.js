
import axios from 'axios'


export const call_api = (end_point, request_data, method = 'get') => {
    const root_url = process.env.REACT_APP_URL;
    return axios({
        method: method,
        url: root_url + end_point,
        data: method.toLowerCase() === 'post' || method.toLowerCase() === 'put' ? request_data : undefined,
        params: method.toLowerCase() === 'get' || method.toLowerCase() === 'delete' ? request_data : undefined,
    })
    .then(response => response.data)  // Return the response
    .catch(error => {
        console.log(error);
        return { status: 'error', message: error.message };  // Return a structured error response
    });
};