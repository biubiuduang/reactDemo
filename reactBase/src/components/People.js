import React from "react";
import PT from "prop-types";

//函数组件
export default function People(props){
    // console.log(props);
    return (
        <div className="component">
            <p>你好我是函数组件</p>
            <p>我的名字是 {props.name} 我的年龄是：{props.age}</p>
            <p>是本人吗？ {props.isSelf ? "是":"不是"}</p>
            {props.children}
            <p>{props.renderProp(1000)}</p>
        </div>
    );
}

//默认值
People.defaultProps = {
  name: "-----",
  age: "-----",
  renderProp: f=>f
};

//
People.propTypes = {
  name: PT.string,
  renderProp: PT.func,
};
