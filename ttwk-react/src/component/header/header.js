import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'

import './/header.scss'

export default function heander(props){
    return (
        <Fragment>
            <div className="d-md-none d-xs-block download-app">
                <Link to="/download">下载天天微课，观看体验更佳</Link>
                <div className="download-logo"></div>
            </div>
            <div className="header">
                <a href="http://www.tiantianweike.com" target="_self" className="logo"></a>
                <a href="javascript:void(0);">个人中心</a>
                <Link to="/download" className="d-md-inline d-none">下载APP</Link>
            </div>
        </Fragment>
    )
}