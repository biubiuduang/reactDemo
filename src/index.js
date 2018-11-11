import React,{createRef} from "react";
import ReactDOM from "react-dom";

import "./main.css";
// import People from "./components/People";
// import Man from "./components/Man";

//<!-- jsx 函数组件/类组件 props children defaultProps prop-types -->

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

// ReactDOM.render(
//     <div>
//         <People name={"88888"} renderProp={()=>Math.random()}></People>
//         <hr/>
//         <h1>认识组件</h1>
//         <h2>认识props</h2>
//         <People name="Joe" age={80}>
//             <p>121212121</p>
//         </People>
//         <Man eyes={1000} hands={300} peopleName={"Flowke"}>
//              <p>我是man</p>
//         </Man>
//     </div>,
//     document.getElementById("root")
// );


// <!-- state -->

//类组件才有内部状态： state
//
// setState
//      更新this.state 的值，
//      render方法再次执行， 生成新的 virtual DOM 结构（虚拟DOM）
//      比较新旧 virtual DOM 的结果，对变化的部分，在页面进行更新
//
//
//  state的其他特性
//      什么是内部状态
//      合并更新 ： 多个 setState 会合并一起更新
//      异步更新
//      语法

// class Number extends React.Component{
//     constructor(props) {
//         super(props);
//         //super不传 props  在构造函数里是不能使用 this.props, 可以用 props
//
//         this.state = {
//             number: Math.random(),
//             name: props.name
//         };
//         console.log(this.state);
//     }
//
//     render(){
//         let{number,name} =  this.state;
//         return (
//             <div>
//                 <p>{number}!🍎🍎🍎🍎🍎</p>
//                 <p>{name}!🍎🍎🍎🍎🍎</p>
//                 <p>{this.props.name}</p>
//                 <button onClick={()=>{
//                     this.setState({
//                         number: 888888,
//                     });
//                     console.log(this.state.number);
//                     this.setState((prevState,props)=>{
//                         console.log(prevState);
//                         return {
//                             name: 'Mike',
//                             number: prevState.number === 888888 ? 1 : 0
//                         }
//                     })
//                 }}>change number</button>
//             </div>
//         );
//     }
// }
//
//
// ReactDOM.render(
//   <div>
//       <Number name={'m1'}/>
//       <Number name={'m2'}/>
//       <Number name={'m3'}/>
//       <Number name={'m4'}/>
//   </div>,
//   document.getElementById("root")
// );

// <!-- 事件系统 -->
//      合成事件对象
//      支持的事件    ==>https://react.docschina.org/docs/events.html
//      this 指向
//          1、行内绑定 this ： function(){}.bind(this)
//          2、行内使用箭头函数
//          3、在constructor 里面对事件回调函数绑定this
//          4、类属性语法 （推荐）

// class FuncNumber extends React.Component{
//     constructor(props) {
//         super (props);
//         this.state = {
//             number: Math.random(),
//             name: props.name
//         };
//
//         // 3、
//         // this.handleButtonClick = this.handleButtonClick.bind(this);
//
//     }
//     // 4、（推荐使用）
//     handleButtonClick=()=>{  //类属性语法
//         console.log(this);
//         this.setState({
//             number: Math.random()
//         })
//     };
//
//     render() {
//         let {number,name} = this.state;
//         return (
//             <div
//                 // onClick={(event)=>{
//                 // console.log(event.currentTarget);
//                 // console.log(event.target);
//                 // console.log("你冒泡到这里了。");}}
//             >
//                 <p>我是funcNumber组件</p>
//                 <p>{number}</p>
//                 <p>{name}</p>
//                 <button
//                     // onClick={(event)=>{
//                     //     // console.log(event.nativeEvent); //获取原声到事件
//                     //     // event.stopPropagation();    //阻止事件冒泡
//                     //     console.log(this);
//                     //     this.setState({
//                     //         number: Math.random()
//                     //     });
//                     // }}
//
//                     onClick={this.handleButtonClick}
//                 >change number</button>
//             </div>
//         )
//     }
// }
//
// ReactDOM.render(
//   <div>
//       <FuncNumber name={'Mike'}/>
//   </div>,
//   document.getElementById("root")
// );


// <!-- 生命周期 -->
// *****只有类组件才有生命周期, 函数组件没有生命周期********
// Mounting 装载
//      constructor
//          只执行一次
//      static getDerivedStateFromProps(props, state)
//          在 render 之前，给你一次改变 state 的机会，不改变就返回null
//      render()
//      componentDidMount()
//          只执行一次
//          获取真实的dom内容
//
// Update 更新
//      父组件更新，（已挂载）子组件 也会随之更新
//      static getDerivedStateFromProps(props,state)
//      shouldComponentUpdate(nextProps,nextState)
//          用于优化性能，return 会返回一个boolean值
//          true： 组件进行正常的更新流程
//          false； 后面生命周期函数不会执行， 视图不会更新
//      render()
//      getSnapshotBeforeUpdate(prevProps,prevState)
//          它执行的时候,新的virtual DOM 结构已经计算出来了
//          但是这个时候,浏览器 DOM 元素还没有更新
//
//      componentDidUpdate()
//          更新完成的时候调用
//          获取真正的 DOM 元素
// unmounting 卸载
//      componentWillUnmount()
//          只执行一次
// 错误处理
//      componentDidCatch(error , info )
//          捕获子组件的生命周期抛出的错误(不会捕获父组件抛出的错误)
//

// class Number extends React.Component{
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             number : Math.random(),
//             name: props.name,
//             hasError: false
//         };
//         console.log('constructor');
//     }
//
//     componentDidCatch(error,info){
//         this.setState({
//             hasError:true
//         })
//     }
//
//     static getDevrivedStateFromProps(props, state){
//         console.log(props,state);
//         console.log('getDerivedStateFromProps');
//         //dom 结构未生成
//         console.log(document.getElementById("Div"));
//         return {
//             name: props.name === state.name ? props.name+'ok' : props.name+'fail'
//         };
//     }
//
//     //是否执行更新
//     shouldComponentUpdate(nextProps,nextState){
//         console.log(this.props,nextProps);
//         return true;
//     }
//     componentDidMount(){
//         console.log('组件装载完成');
//         //界面已生成
//         console.log(document.getElementById("Div"));
//     }
//
//     //更新前获取快照
//     getSnapshotBeforeUpdate(prevProps,prevState){
//         console.log(prevProps,prevState);
//         return null;
//     }
//
//     componentDidUpdate(prevProps,prevState,shot){
//         console.log(shot); //打印快照的返回值
//         console.log('组件更新完成');
//     }
//
//     handleButtonClick=()=>{
//       this.setState({
//           number: Math.random()
//       })
//     };
//
//     render() {
//         console.log('render');
//         let {number,name,hasError} = this.state;
//         // throw Error ('父组件错了');
//         return (
//             <div id={'Div'}>
//                 <p>{number} 🍎🍎🍎🍎🍎</p>
//                 <p>{name}</p>
//                 <p>------</p>
//                 {
//                     hasError?(
//                         <p>Sun 崩溃了</p>
//                     ):<Sun num={number} />
//                 }
//                 {/*{number > 0.5 &&  <Sun num={number} />}*/}
//                 <p>------</p>
//                 <button onClick={this.handleButtonClick}>
//                     change number
//                 </button>
//             </div>
//         )
//     }
// }
// class Sun extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             num: props.num,
//         }
//     }
//
//     static getDerivedStateFromProps(props,state){
//         return {
//             num: props.num
//         };
//     }
//
//     componentDidMount(){
//         console.log('sun Mount');
//     }
//
//     componentDidUpdate(){
//         console.log('sun Update');
//     }
//
//     componentWillUnmount(){
//         console.log('sun Unmount');
//     }
//
//     render() {
//         if(this.props.num > 0.5){
//             throw Error ('我废了');
//         }
//         return (
//             <div>
//                 <p>Sum</p>
//                 <p>{this.state.num} 🍎🍎🍎🍎🍎🍎</p>
//             </div>
//         )
//     }
// }
//
// ReactDOM.render(
//     <div>
//         <Number name={'Make'}/>
//
//     </div>,
//     document.getElementById("root")
// );


//<!-- 获取真实 DOM -->
// 回调
//
// createdRef
//
// 字符串(过时)

// class Number extends React.Component{
//     constructor(props){
//         super(props);
//
//         this.state = {
//             number: Math.random(),
//             name: props.name
//         };
//
//         this.numDiv = createRef();
//     }
//
//     handleButtonClick=()=>{
//         console.log(this.numDiv.current);
//         this.setState({
//             number: Math.random()
//         })
//     };
//
//     render() {
//         let {number,name} = this.state;
//         return (
//             <div id={'numDiv'} ref={this.numDiv}>
//                 <p>{number} 🍎🍎🍎🍎🍎🍎</p>
//                 <p>{name}</p>
//                 <p>-----------</p>
//                 <Sun name={'Mike'} num={number}/>
//                 <p>-----------</p>
//                 <button
//                     onClick={this.handleButtonClick}
//                 >change number</button>
//             </div>
//         )
//     }
// }
//
// class Sun extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: props.name,
//             num: props.num
//         }
//     }
//
//     static getDerivedStateFromProps(props,state) {
//         return {
//             num: props.num
//         }
//     }
//
//     render() {
//         return (
//             <div>
//                 <p>{this.state.name}</p>
//                 <p>{this.state.num}</p>
//             </div>
//         )
//     }
// }
//
// ReactDOM.render(
//     <div>
//         <Number />
//     </div>,
//     document.getElementById("root")
// );


//<!-- 组件受控 -->
//      组件状态的变化是否是 react 接管的
//

class Number extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            number: Math.random(),
            name: props.name,
            inputVal: '',
        }
    }

    handleButtonClick=()=>{
        this.setState({
            number: Math.random(),
            name: this.input.value,
            inputVal: ''
        })
    };
    handleInputChange=(ev)=>{
        this.setState({
            // inputVal: this.input.value
            inputVal: ev.target.value
        })
    };

    render() {
        let {number,name,inputVal} = this.state;
        return (
            <div>
                <p>{number} </p>
                <input
                    onChange={this.handleInputChange}
                    value={inputVal}
                    type='text'
                    ref={el=>this.input=el}/>
                <p>{inputVal}</p>
                <p>{name}</p>
                <p>--------</p>
                <Sun num={number}/>
                <p>--------</p>
                <button
                    onClick={this.handleButtonClick}
                >change number</button>
            </div>
        )
    }
}

class Sun extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            num: props.num
        }
    }

    static getDerivedStateFromProps(props,state) {
        return {
            num: props.num
        }
    }

    render() {
        let {num} = this.state;
        return (
            <div>
                <p>{num}</p>
            </div>
        )
    }
}

ReactDOM.render(
    <div>
        <Number name={'Mike'}/>
    </div>,
    document.getElementById("root")
);