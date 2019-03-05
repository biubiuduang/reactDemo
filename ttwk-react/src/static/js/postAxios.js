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

    let dialogClass = document.getElementsByClassName("dialog");

    let Model = document.createElement("div");
    if(dialogClass.length === 0 ){
        Model.setAttribute("class","v-model-body");
        Model.style.display = 'block';
        Model.style.zIndex = 100+dialogClass.length;
        document.body.appendChild(Model);
    }

    let Dialog = document.createElement('div');
    Dialog.setAttribute("class","dialog");
    Dialog.innerHTML = `<p>loading...</p>`;
    document.body.appendChild(Dialog);

    Dialog.style.display = 'flex';
    Dialog.style.zIndex = 100+dialogClass.length+1;

    debugger;

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
        console.log(typeof error);
        typeof error === "function" ? error(reject) : console.log(reject)
    }).finally(()=>{
        document.getElementsByTagName("body")[0].removeChild(Dialog);
        console.log(Model);
        if(document.getElementsByClassName("dialog").length === 0 ){
            document.getElementsByClassName("v-model-body")[0].style.display = 'none';
        }

    })
};

export default postAxios;