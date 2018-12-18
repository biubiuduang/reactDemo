import React,{Component} from 'react'

import baseJs from "../../static/js/common"

import TagsNav from "../../component/tagNav/tagNav"
import Item from "../../component/item/item"

import postAxios from '../../static/js/postAxios'


export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            featured : []
        }
    }

    handleClickList = (id) => {
        console.log(id);
    };

    handleNavClick= (type,id) =>{
        let {history} = this.props;
        history.push({pathname:'/list',state: {type,id}});
    };

    handleGetData = ()=>{
        let that = this;
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
        });
    };

    componentDidMount(){
        this.handleGetData();
    }

    render(){

        let {featured} = this.state;

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
            <div>
                <TagsNav
                    handleNavClick={this.handleNavClick}
                />
                <div className="group-body">
                    {list}
                </div>
            </div>
        )
    }
}