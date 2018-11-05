import React,{Fragment} from 'react';
import ReactDOM from "react-dom";

import "./main.css";

//把你写的结构，通过 js 渲染到界面上

// JSX , 本质上也是 js 代码

// type: "div"
// children:
//     aaaaaaa
//     2222222

// JSX 其实就是 写结构的语法糖而已；
// 它会被 babel 这个工具转变成 js 代码。这份 js 代码运行之后，会得到一个对象，

// （这个对象其实就是 virtual DOM）虚拟DOM

console.log(
    <div>aaaaaa
        <p>
            222222222
            <span>345678</span>
        </p>
    </div>
);


// 1。jsx 中使用表达式
// 2。jsx 中嵌套
// 3。jsx 中的闭合  <div/>
// 4。样式
// 5。属性   "-"相连的属性要变成驼峰  margin-left => marginLeft
//    关键字属性   class  ==> className

let s1 = "hello",
    s2 = "world";
function sum(a,b){
    return a+b;
}

let jsx1 = (
    <div>
        <p>我是jsx1</p>
    </div>
);
let jsx2 = (
    <div>
        <p>我是jsx2</p>
    </div>
);

let jsx3 = (
    <Fragment>
        <p>31</p>
        <p>32</p>
    </Fragment>
);

ReactDOM.render(
    <div>
        <p style={{color:'red'}}>{s1} {s2}</p>
        <p className="name">{`${s1} ${s2} 模版字符串`}</p>
        <p>{10+22}</p>
        <p>{sum(1,2)}</p>
        <p>{5 > 3 ? "对的":"不对"}</p>
        {jsx1}
        {jsx2}
        {jsx3}
    </div>,
    document.getElementById("root")
);
