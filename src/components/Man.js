import React,{Component} from "react";
import People from "./People";


export default class Man extends Component{

    render(){
        //console.log(this.props);
        let {eyes,hand,peopleName,children} = this.props;
        return (
            <div className="man">
                <p>大家好，我是Man组件</p>
                <People name={peopleName} age={20} isSelf={true}/>
                <p>我有{hand} 只手</p>
                <p>我有{eyes} 只眼睛</p>
                { children }
            </div>
        )
    }
}

//export default Man;

Man.defaultProp = {

};