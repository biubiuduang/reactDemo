import React,{Component,Fragment} from 'react'

import Header from "../../component/header/header.js"
import Item from "../../component/item/item"

import postAxios from '../../static/js/postAxios'


export default class Home extends Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }

    componentDidMount(){
        postAxios({
            method: "post",
            url: "/video/featured",
            success: function(data){
                console.log(data);
            }
        })
    }

    render(){
        return (
            <Fragment>
                <Header/>
                <h2>Hello React! home</h2>
            </Fragment>
        )
    }
}