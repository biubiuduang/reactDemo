import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'

import './/header.scss'

export default function heander(props){
    return (
        <Fragment>
            <div className="d-md-none d-xs-block download-app">
                <Link to="/download">下载天天微课，观看体验更佳</Link>
                <div className="download-logo"/>
            </div>
            <div className="header">
                <Link to="/" className="logo"/>
                <span>个人中心</span>
                <Link to="/download" className="d-md-inline d-none">下载APP</Link>
            </div>
        </Fragment>
    )
}