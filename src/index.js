import React from "react";
import ReactDOM from "react-dom";

import "./main.css";
import People from "./components/People";
import Man from "./components/Man";
// 1. 组件的表现形式
//     函数组件
//     类组件
// 2. 使用组件
//      标签名大写开头
//      变量在作用域内

// 类组件 VS 函数组件
// 1、接收 props 不同
// 2、类组件 有实例， 函数组件没有实例 不能使用this

//函数组件
// function ComponentName(){
//     return (
//         <div className="component">
//             <p>你好我是函数组件</p>
//             <Comp/>
//         </div>
//     );
// }

//类组件
// class Comp extends React.Component {
//     render(){
//         return (
//             <div className="comp">
//                 <p>我是类组件</p>
//             </div>
//         )
//     }
// }


//在自定义 属性里面可以直接写一些属性，然后接上一些值。
//在函数组件里面，通过第一个参数接收 props；
//在类组件里面，通过组件实例下面的 props ： this.props;
//数据总是从顶层流向底层： 单项数据流

//children
// 标签直接的内容就是 props.children


//defaultProps
// props默认值

//prop-types
//  PT.array PT.bool PT.number PT.object PT.string PT.func PT.symbol
//  PT.number.isRequired  指定必填项


// PT.node      可以渲染的东西
// PT.element    react的元素

ReactDOM.render(
    <div>
        <People name={"88888"} renderProp={()=>Math.random()}></People>
        <hr/>
        <h1>认识组件</h1>
        <h2>认识props</h2>
        <People name="Joe" age={80}>
            <p>121212121</p>
        </People>
        <Man eyes={1000} hands={300} peopleName={"Flowke"}>
             <p>我是man</p>
        </Man>
    </div>,
    document.getElementById("root")
);