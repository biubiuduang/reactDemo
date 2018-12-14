import React,{Component,Fragment} from 'react'
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
            featured : [],
            gradeActive: '',
            subjectActive: ''
        }
    }

    handleClickList = (id) => {
        console.log(id);
    };

    static contextTypes = {
        router: PT.object
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

        if(!gradeActive){
            gradeActive = '全部'
        }

        if(!subjectActive){
            subjectActive = '全部'
        }

        this.setState({
            gradeActive,
            subjectActive
        });

        if(this.context.router.history.location.pathname !== '/list'){
            this.context.router.history.push({pathname: '/list', state: {type,id}});
        }
    };

    componentWillMount(){
        let that = this;
        console.log("Will Mount");
        postAxios({
            method: "post",
            url: "/video/featured",
            success: function(data){
                if(!data.data.tk_error){
                    that.setState({
                        featured : data.data.videoGroups
                    })
                }

            }
        })
    }

    render(){

        let {featured,gradeActive,subjectActive} = this.state;

        let list = featured.map( item => {
            let listItem = item.videos.map( item =>{
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
                <div className="group" key={item.tag.tagId}>
                    <p className="group-title">{item.tag.tagId}</p>
                    {listItem}
                </div>
            )
        });

        return (
            <div className="content-body">
                <Header/>
                <TagsNav
                    handleNavClick={this.handleNavClick}
                    gradeActive={gradeActive}
                    subjectActive={subjectActive}
                />
                <div className="group-body">
                    {list}
                </div>
            </div>
        )
    }
}