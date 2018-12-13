import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'

import "../../component/tagNav/tagNav.scss"
import postAxios from "../../static/js/postAxios";

export default class tagNav extends Component{
    constructor(props){
        super(props);

        this.state={
            tags: [],
            tagsActive: [null,null]
        }
    }

    handleTagsClick=(type,id)=>{
        console.log(type,id);

        let {tagsActive} = this.state;

        tagsActive = tagsActive.map((item,index)=>{
            if(index === type){
                return id;
            }
            if(item === null){
                return '全部'
            }
        });

        this.setState({
            tagsActive
        })

    };

    componentDidMount(){
        let that = this;
        postAxios({
            method: "post",
            url: "/tag/search",
            success: function(data){
                if(!data.data.tk_error){
                    that.setState({
                        tags: data.data.tags
                    })
                }
            }
        });
    }

    render() {

        let {tags,tagsActive} = this.state;

        let gradeTags = tags.filter(item => item.type === "grade");
        let subjectTags = tags.filter(item => item.type === "subject");

        let grade = gradeTags.map(item => {
           return (
               <li onClick={()=>this.handleTagsClick(0,item.tagId)} key={item.tagId} className={tagsActive[0] === item.tagId ? 'active' : ''}>{item.tagId}</li>
           )
        });

        let subject = subjectTags.map(item => {
           return (
               <li onClick={()=>this.handleTagsClick(1,item.tagId)} key={item.tagId}>{item.tagId}</li>
           )
        });

        return (
            <div className="tags-nav">
                <div className="nav-container nav-container-grade">
                    <p className="nav-label">年级：</p>
                    <ul className="tabs-list">
                        <li key='gradeAll' className={tagsActive[0] === '全部' ? 'active' : ''}>全部</li>
                        {grade}
                    </ul>
                </div>
                <div className="nav-container nav-container-subject">
                    <p className="nav-label">学科：</p>
                    <ul className="tabs-list">
                        <li key='subjectAll' className={tagsActive[1] === '全部' ? 'active' : ''}>全部</li>
                        {subject}
                    </ul>
                </div>
            </div>
        )
    }
}