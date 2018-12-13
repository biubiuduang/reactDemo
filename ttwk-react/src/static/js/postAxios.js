import axios from 'axios'
import baseJs from '../js/common'

let postAxios = function(prams){
    let appId = window.location.hostname;
    let {
        method="get",
        url,
        data = {},
        headers={
            'Content-Type': 'application/json',
        },
        dataType='json',
        success,
        error,
    } = prams;

    data.tk_headers = {
        osType:"web",
        token: baseJs.getCookie('token'),
        appId: appId
    };

    axios({
            method,
            headers,
            url: `/api${url}`,
            data,
            dataType
        }
    ).then(
        resolve=>success(resolve)
    ).catch(reject=>{
        typeof error === "function" ? error(reject) : console.log(reject)
    }).finally(()=>{

    })
};

export default postAxios;