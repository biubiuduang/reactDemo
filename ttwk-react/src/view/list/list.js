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
            noMore: true
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
        let {list,tsLast} = this.state;
        postAxios({
            method: "post",
            url: "/video/list",
            data,
            success: function(data){
                if(!data.data.tk_error){
                    list = data.data.videos;
                    tsLast = list.length > 0 ? list[list.length-1].createTime : 0;
                    that.setState({
                        list,
                        tsLast
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
                d = {tsLast:0,tagId};
            }
        }else{
            let tagIds_and = [gradeActive,subjectActive];
            d = {tsLast,tagIds_and};
        }

        let scrollTop = document.documentElement.scrollTop;
        let clientHeight = document.body.clientHeight;
        let scrollHeight = document.body.scrollHeight;

        console.log(scrollTop,scrollHeight,clientHeight);
console.log(history.location.pathname);
        if(addMore && scrollTop + scrollHeight === clientHeight && history.location.pathname === '/list'){
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
                            list = [...data.data.videos,...list];
                            tsLast = list[list.length-1].createTime;
                            addMore = true;
                        }else{
                            addMore = false;
                            noMore = true;
                        }

                        that.setState({
                            list,
                            tsLast,
                            addMore,
                        })
                    }
                }
            })
        }

    };

    componentDidMount(){
        this.handleInit();
        console.log("will mount");
        window.addEventListener('scroll', this.handleScreen);
    }


    render(){

        let {list,gradeActive,subjectActive} = this.state;

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

        return (
            <div>
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