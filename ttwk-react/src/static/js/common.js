let baseParams = {
    ww: document.body.clientWidth     //浏览器窗口宽度
};

let baseJs = {
    init: function(){
        console.log(baseParams.ww);
        this.resetSize();
    },
    resetSize: function () {
        var that = this;
        this.rem();
        window.onresize = function () {
            baseParams.ww = document.body.clientWidth;
            that.rem();
        };
    },
    rem: function () {
        if(baseParams.ww < 1200){
            let size = baseParams.ww / 18;
            document.getElementsByTagName("html")[0].style.fontSize = `${size}px`
        }
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
    }
};

window.onload = function(){
    baseJs.init();
};

export default baseJs;