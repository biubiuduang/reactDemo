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

    let Dialog = document.createElement('div');
    Dialog.setAttribute("class","dialog");
    Dialog.innerHTML = `<p>loading...</p>`;
    document.body.appendChild(Dialog);
    let dialogClass = document.getElementsByClassName("dialog");
    dialogClass[0].style.display = 'flex';
    dialogClass[0].style.zIndex = '2002';

    let model = document.getElementsByClassName("v-model-body");
    model[0].style.display = 'block';
    model[0].style.zIndex = '2001';



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
        if(document.getElementsByClassName("dialog").length && document.getElementsByClassName("dialog").length > 1){
            document.body.removeChild(dialogClass[0]);
            dialogClass[0].style.display = 'flex';
            dialogClass[0].style.zIndex = '2002';
        }else{
            document.body.removeChild(dialogClass[0]);
            model[0].style.display = 'none';
        }

    })
};

export default postAxios;