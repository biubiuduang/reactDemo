import React,{Component} from 'react'

import baseJs from "../../static/js/common"

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
            addMore: false,
            noMore: false
        }
    }

    handleInit= () => {
        let {history} = this.props;
        console.log(history);
        let {type,id} = history.location.state;
        this.dataInit(type,id);
    };

    handleNavClick= (type,id) =>{
        this.dataInit(type,id);
    };

    dataInit = (type,id) =>{
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

        if(gradeActive === '全部' || subjectActive === '全部'){
            if(gradeActive === '全部' && subjectActive === '全部'){
                this.handleGetData({tsLast:0});
            }else{
                let tagId = gradeActive === '全部' ? subjectActive : gradeActive;
                this.handleGetData({tsLast:0,tagId});
            }
        }else{
            let tagIds_and = [gradeActive,subjectActive];
            this.handleGetData({tsLast:0,tagIds_and});
        }
    };
    handleGetData=(data)=>{
        let that = this;
        let {list,tsLast,addMore,noMore} = this.state;
        postAxios({
            method: "post",
            url: "/video/list",
            data,
            success: function(data){
                if(!data.data.tk_error){
                    list = data.data.videos;
                    tsLast = list.length > 0 ? list[list.length-1].createTime : 0;
                    if(list.length === 20){
                        addMore = true;
                        noMore = false;
                    }else{
                        addMore = false;
                        noMore = true;
                    }
                    that.setState({
                        list,
                        tsLast,
                        addMore,
                        noMore
                    })
                }
            }
        })
    };

    handleScreen = () =>{
        let that = this;
        let {list,tsLast,gradeActive,subjectActive,addMore,noMore} = this.state;
        let {history} = this.props;
        let d = {};
        if(gradeActive === '全部' || subjectActive === '全部'){
            if(gradeActive === '全部' && subjectActive === '全部'){
                d = {tsLast};
            }else{
                let tagId = gradeActive === '全部' ? subjectActive : gradeActive;
                d = {tsLast,tagId};
            }
        }else{
            let tagIds_and = [gradeActive,subjectActive];
            d = {tsLast,tagIds_and};
        }

        let scrollTop = document.documentElement.scrollTop;
        let clientHeight = document.body.clientHeight;
        let scrollHeight = document.body.scrollHeight;

        if(addMore && scrollTop + clientHeight === scrollHeight && history.location.pathname === '/list'){
            this.setState({
                addMore : false
            });
            postAxios({
                method: "post",
                url: "/video/list",
                data: d,
                success: function(data){
                    if(!data.data.tk_error){
                        if(data.data.videos.length > 0){
                            list = [...list,...data.data.videos];
                            tsLast = list[list.length-1].createTime;
                        }else{
                            addMore = false;
                            noMore = true;
                        }

                        if(data.data.videos.length === 20){
                            addMore = true;
                            noMore = false;
                        }

                        that.setState({
                            list,
                            tsLast,
                            addMore,
                            noMore
                        })
                    }
                }
            })
        }

    };

    componentDidMount(){
        this.handleInit();
        window.addEventListener('scroll', this.handleScreen);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScreen);
    }


    render(){

        let {list,gradeActive,subjectActive,noMore} = this.state;

        let itemList =list.length > 0 ? list.map( item => {
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
        }) : <p>暂无数据!</p>;

        let more = noMore && list.length > 0 ? <p className="no-more">没有更多的微课了！</p> : null;

        return (
            <div>
                <TagsNav
                    handleNavClick={this.handleNavClick}
                    gradeActive={gradeActive}
                    subjectActive={subjectActive}
                />
                <ul className="group-body group-list-body">
                    {itemList}
                </ul>
                {more}
            </div>
        )
    }
}