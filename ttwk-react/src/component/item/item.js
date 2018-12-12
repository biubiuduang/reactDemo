import React,{Component} from 'react'

export default class list extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleList(id){
        console.log(id);
    }

    render() {
        let {
            id: videoId,
            name,
            author,
            title,
            date,
            like
        } = this.props;
        return (
            <li onClick={this.handleList(videoId)} className={"list col-lg-3 col-md-4 col-sm-6 col-sx-6 col-ss-12"}>
                <div className="list-content">
                    <div className="left video-info">
                        <div className="user-info">
                            <div className="author">
                                <img src={author} alt=""/>
                            </div>
                            <p className="list-author-title">{name}</p>
                        </div>
                        <p className="list-video-title">{title}</p>
                        <p className="video-time">
                            <span>{date}</span>
                            <span>{like}</span>
                        </p>
                    </div>
                </div>
            </li>
        )
    }
}