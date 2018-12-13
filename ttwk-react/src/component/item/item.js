import React,{Component} from 'react'

import '../../component/item/item.scss'

export default class list extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        let {
            id: videoId,
            name,
            poster,
            author,
            title,
            length,
            createTime,
            like,
            handleClick,
            tags=[]
        } = this.props;

        let tagList = tags.map((item,index)=>{
            if(index < 2){
                return <li key={index}>{item.tagId}</li>
            }
            if(index === 2){
                return <li key={index} className="tags-more"></li>
            }
        });

        return (
            <li onClick={()=>handleClick(videoId)} className={"video-item col-lg-3 col-md-4 col-sm-6 col-sx-6 col-ss-12"}>
                <div className="item-content">
                    <div className="poster">
                        <img src={poster[0].url} srcSet={`${poster[1].url} 2x,${poster[2].url} 3x`} alt=""/>
                        <span>{length}</span>
                    </div>
                    <div className="video-info">
                        <div className="user-info">
                            <div className="author">
                                {author ? <img src={author.thumbnails[0].url} srcSet={`${author.thumbnails[1].url} 2x,${author.thumbnails[2].url} 3x`}/> : <img src="../../static/img/avatar.png"/>}
                            </div>
                            <p className="author-name">{name}</p>
                        </div>
                        <p className="video-title">{title}</p>
                        <p className="video-time">
                            <span>{createTime}</span>
                            <span>{like}赞</span>
                        </p>
                        <ul>
                            {tagList}
                        </ul>
                    </div>
                </div>
            </li>
        )
    }
}