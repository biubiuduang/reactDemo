import React,{Component} from 'react'

import "../../component/tagNav/tagNav.scss"
import postAxios from "../../static/js/postAxios";

export default class tagNav extends Component{
    constructor(props,context){
        super(props,context);

        this.state={
            tags: []
        }
    }

    handleInit=()=>{

        let {gradeActive,subjectActive} = this.state;
        if(this.context.router.history.location.pathname !== '/list'){
            gradeActive = undefined;
            subjectActive = undefined;
            this.setState({
                gradeActive,
                subjectActive
            })
        }else{
            let {type,id} = this.context.router.history.location.state;
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
            })
        }
    };

    componentWillMount(){
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

        let {handleNavClick,gradeActive,subjectActive} = this.props;
        let {tags} = this.state;

        let gradeTags = tags.filter(item => item.type === "grade");
        let subjectTags = tags.filter(item => item.type === "subject");

        gradeTags.unshift({
            tagId: '全部',
            type: 'grade'
        });

        subjectTags.unshift({
            tagId: '全部',
            type: 'subject'
        });

        let grade = gradeTags.map(item => {
           return (
               <li onClick={()=>handleNavClick('grade',item.tagId)} key={item.tagId} className={gradeActive === item.tagId ? 'active' : ''}>{item.tagId}</li>
           )
        });

        let subject = subjectTags.map(item => {
           return (
               <li onClick={()=>handleNavClick('subject',item.tagId)} key={item.tagId} className={subjectActive === item.tagId ? 'active' : ''}>{item.tagId}</li>
           )
        });

        return (
            <div className="tags-nav">
                <div className="nav-container nav-container-grade">
                    <p className="nav-label">年级：</p>
                    <ul className="tabs-list">
                        {grade}
                    </ul>
                </div>
                <div className="nav-container nav-container-subject">
                    <p className="nav-label">学科：</p>
                    <ul className="tabs-list">
                        {subject}
                    </ul>
                </div>
            </div>
        )
    }
}