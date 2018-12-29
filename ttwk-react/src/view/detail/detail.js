import React,{Component} from 'react'
import Video from "../../component/detail/video";
import postAxios from "../../static/js/postAxios";

export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            videoUri: ""
        }
    }

    handleGetVideo=()=>{
        let {history} = this.props;
        console.log(history);
        let id = history.location.state.id;
        postAxios({
            method: "post",
            url: "/video/detail",
            data: {
                videoId: id
            },
            success: function(data){
                return new Promise((resolve,reject)=>{
                    reject("false");
                })
            },
            error: function(err){
                console.log(err);
            }
        })
    };

    componentDidMount(){
       this.handleGetVideo();
    };

    render(){
        let {history} = this.props;
        console.log(history);
        return (
            <div className="video-content" >
                <div className="south" ref="south">
                    <video width="1200px" ref="video" controls>
                        <source src="http://www.w3school.com.cn/example/html5/mov_bbb.mp4" type="video/mp4"/>
                        Your browser does not support HTML5 video.
                    </video>
                </div>
                <Video />
                <p>{history.location.state.id}</p>
            </div>
        )
    }
}

