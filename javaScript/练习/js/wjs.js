//获取元素的简单封装
/**
 * val
 *  实例：
 *      $(function(){});
 *      $("#id")
 *      $(".class")
 *      $("element")
 *      $(this) $(document)
 * */
function $(val){
    if(typeof val === 'function'){
        window.onload = val;
    }else if ( typeof val === 'string' ) {
        if(val.indexOf("#") === 0){
            return document.getElementById(val.substring(1));
        }else if(val.indexOf(".") === 0){
            return document.getElementsByClassName(val.substring(1));
        }else{
            return document.getElementsByTagName(val);
        }
    } else if ( typeof val === 'object' ) {
        return val;
    }
}

//动画
/**
* @params
*   obj  //运动的对象 (required)
*   attr  //改变的属性 (required)
*   dir   //步长值   (默认 1)
*   target //目标值  （required）
*   interval //一次的时长 (默认 14 )
*   cb //回调函数
* */
function doMove(params){
    clearInterval(params.obj.timer);
    params.dir = params.dir || 1;
    params.dir =  parseInt(getStyle(params.obj,params.attr)) > params.target ? -params.dir : params.dir;
    params.obj.timer = setInterval(()=>{
        var speed = parseInt(getStyle(params.obj,params.attr)) + params.dir;  //步长
        if(speed > params.target && params.dir > 0 || speed < params.target && params.dir < 0){
            speed = params.target;
        }
        params.obj.style[params.attr] = speed+"px";
        if(speed === params.target){
            clearInterval(params.obj.timer);
            params.cb && params.cb();
        }
    },params.interval);
}

//透明度改变
/**
 * @params
 *   obj //改变的对象 （required）
 *   dir //步长值  （required）
 *   target //目标值 （required）
 *   cb //回调函数
 * */
function opacity(params){
    clearInterval(params.obj.oTimer);
    params.interval = params.interval || 100;
    params.dir = parseInt(getStyle(params.obj,'opacity')*100) > params.target ? -params.dir : params.dir;
    params.obj.oTimer = setInterval(()=>{
        var speed = parseInt(getStyle(params.obj,'opacity')*100) + params.dir;
        if(speed > params.target && params.dir > 0 || speed < params.target && params.dir < 0){
            speed = params.target;
        }
        params.obj.style.opacity = speed/100;
        params.obj.style.filter = `alpha(opacity=${speed});`;
        if(speed === params.target){
            clearInterval(params.obj.oTimer);
            params.cb && params.cb();
        }
    },params.interval);
}


//抖动
/**
* @params
*   obj //抖动的对象
*   attr //改变的属性
*   cb //回调函数
* */
function shake(obj,attr,cb){
    if(!obj.onOff){
        console.log(obj.onOff,attr);
        obj.onOff = true;
        var arr = [];
        var num = 0;
        var pos = parseInt(getStyle(obj,attr));
        for (var i =20;i > 0; i-=2){
            arr.push(i,-i);
        }
        arr.push(0);
        var len = arr.length;
        clearInterval(obj.shake);
        obj.shake = setInterval(()=>{
            obj.style[attr] = pos+arr[num] + 'px';
            num++;
            if(num === len){
                clearInterval(obj.shake);
                obj.onOff = false;
                cb && cb();
            }
        },14);
    }
}

//获取当前元素的属性： 兼容IE6 7 和 其他浏览器
/**
 * 获取当前元素属性的原生方法：
 * IE6 7 : obj.currentStyle[attr]
 * 其他浏览器： getComputedStyle(obj)[attr]
 * */
function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]
}

