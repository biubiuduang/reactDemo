let baseParams = {
    ww: document.body.clientWidth,     //浏览器窗口宽度
    wh: document.body.clientHeight
};

let baseJs = {
    init: function(){
        this.resetSize();
        this.dialog();
    },
    resetSize: function () {
        var that = this;
        this.rem();
        window.onresize = function () {
            baseParams.ww = document.body.clientWidth;
            baseParams.wh = document.body.clientHeight;
            that.rem();
        };
    },
    rem: function () {
        if(baseParams.ww < 1200){
            let size = baseParams.ww / 18;
            document.getElementsByTagName("html")[0].style.fontSize = `${size}px`
        }
    },
    dialog: function(){
        let dialog = document.getElementsByClassName("dialog");
        dialog[0].setAttribute('class','dialog-show');
    },
    setCookie: function(c_name,value,expiredays){
        var exdate=new Date(expiredays*1000);
        document.cookie=c_name+ "=" +escape(value)+
            ((expiredays == null) ? "" : ";expires="+exdate.toGMTString())
    },
    getCookie:function (c_name) {
        if (document.cookie.length>0)
        {
            var c_start=document.cookie.indexOf(c_name + "=");
            if (c_start !== -1)
            {
                c_start=c_start + c_name.length+1;
                var c_end=document.cookie.indexOf(";",c_start);
                if (c_end === -1) c_end=document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    },
    timeFormat: function(time,format){
        let date = new Date(time);
        if(format !== 'length'){
            var y = date.getFullYear().toString();
            var m = (date.getMonth()+1).toString();
            m = m.length < 2 ? `0${m}` : m;
            var d = date.getDate().toString();
            d = d.length < 2 ? `0${d}` : d;
            var h = date.getHours().toString();
            h = h.length < 2 ? `0${h}` : h;
        }
        let minute = date.getMinutes().toString();
        minute = minute.length < 2 ? `0${minute}` : minute;
        let second = date.getSeconds().toString();
        second = second.length < 2 ? `0${second}` : second;

        if(format === 'date'){
            return `${y}-${m}-${d}`;
        }

        if(format === 'month'){
            return `${m}月${d}日`;
        }

        if(format === 'time'){
            return `${y}-${m}-${d} ${h}:${minute}:${second}`;
        }

        if(format === 'length'){
            return `${minute}分${second}秒`
        }
    }
};

window.onload = function(){
    baseJs.init();
};

export default baseJs;