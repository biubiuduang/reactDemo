import React,{Component} from 'react'

import baseJs from "../../static/js/common"

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

    handleNavClick= (type,id) =>{
        let {gradeActive,subjectActive} = this.state;
        let {history} = this.props;

        type === 'grade' ? gradeActive = id : subjectActive = id;

        gradeActive ? subjectActive = '全部' : gradeActive = '全部';

        this.setState({
            gradeActive,
            subjectActive
        });

        history.push({pathname: '/list', state: {type,id}});
    };

    componentDidMount(){
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
            <div>
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