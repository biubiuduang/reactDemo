import React,{Component} from 'react'
import PT from 'prop-types'


import baseJs from "../../static/js/common"

import Header from "../../component/header/header.js"
import TagsNav from "../../component/tagNav/tagNav"
import Item from "../../component/item/item"

import postAxios from '../../static/js/postAxios'


export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            list : [],
            gradeActive: '全部',
            subjectActive: '全部',
            tsLast: 0,
        }
    }

    static contextTypes = {
        router: PT.object
    };

    handleInit= () => {
        console.log(this.context.router);
        let {type,id} = this.context.router.route.location.state;
        let {gradeActive,subjectActive,tsLast} = this.state;

        if(type === 'grade'){
            gradeActive = id;
        }

        if(type === 'subject'){
            subjectActive = id;
        }

        this.setState({
            gradeActive,
            subjectActive
        });

        this.handleGetData({tsLast});
    };

    handleGetData=(data)=>{
        var that = this;
        let {list,tsLast} = this.state;
        postAxios({
            method: "post",
            url: "/video/list",
            data,
            success: function(data){
                if(!data.data.tk_error){
                    list = list.concat(data.data.videos);
                    tsLast = list[list.length-1].createTime;
                    that.setState({
                        list,
                        tsLast
                    })
                }
            }
        })
    };

    handleClickList = (id) => {
        console.log(id);
    };

    handleNavClick= (type,id) =>{
        console.log(type,id);
        let {gradeActive,subjectActive} = this.state;
        if(type === 'grade'){
            gradeActive = id;
        }

        if(type === 'subject'){
            subjectActive = id;
        }

        this.setState({
            gradeActive,
            subjectActive
        });


    };

    componentWillMount(){
        let that = this;
        this.handleInit();
    }

    render(){

        let {list,gradeActive,subjectActive} = this.state;

        let itemList = list.map( item => {
            return <Item
                handleClick={this.handleClickList}
                key={item.videoId}
                id={item.videoId}
                name={item.author.name}
                author={item.author.avatar}
                poster={item.screenshot.thumbnails}
                title={item.name}
                length={baseJs.timeFormat(item.length,'length')}
                createTime={baseJs.timeFormat(item.createTime,'month')}
                like={item.like}
                tags={item.tags}
            />;
        });

        return (
            <div className="content-body">
                <Header/>
                <TagsNav
                    handleNavClick={this.handleNavClick}
                    gradeActive={gradeActive}
                    subjectActive={subjectActive}
                />
                <div className="group-body group-list-body">
                    {itemList}
                </div>
            </div>
        )
    }
}