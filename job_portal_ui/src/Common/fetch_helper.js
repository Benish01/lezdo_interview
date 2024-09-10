
import axios from 'axios'


export const call_api = (end_point, request_data, method = 'get') => {
    console.log(end_point,request_data,method)
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
        return { status: 'error', message: error.message };  
    });
};

export const file_upload = (formData, on_upload_progress = ()=>{}, headers={'Content-Type': 'multipart/form-data'},  end_point ="/common/upload_file") =>{
    const root_url = process.env.REACT_APP_URL;
    return axios({
        url:root_url + end_point,
        method:"post",
        data:formData,
        headers,
        onUploadProgress:(event)=>{
            on_upload_progress(event)
        }
    }).then(response => response.data)
    .catch(error =>{
        return { status: 'error', message: error.message };
    })
}