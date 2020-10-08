import React from 'react';
import './index.less';
import { GithubOutlined, WechatOutlined, QqOutlined, MailOutlined, ZhihuOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

export default class Footer extends React.PureComponent{
    render(){
        return(
            <div className='footer'>
                <div className='footer-content'>
                    <div className='content-reference'>
                        <span className='icon-span'>联系方式：</span>
                        <div className='content-icon'>
                            <a href='https://github.com/yirenliancheng' target='_blank' >
                               <GithubOutlined style={{'fontSize':'24px','color':'white'}}/>  
                               <span className='icon-span'>github</span>
                            </a>
                        </div>
                        <div className='content-icon'>
                            <WechatOutlined style={{'fontSize':'24px','color':'white'}}/>
                            <span className='icon-span'>wechat: 18321395702</span>
                        </div>
                        <div className='content-icon'>
                            <a>
                                <ZhihuOutlined style={{'fontSize':'24px','color':'white'}}/>
                                <span  className='icon-span'>知乎</span>
                            </a>
                        </div>
                        <div className='content-icon'>
                            <QqOutlined style={{'fontSize':'24px', 'color':'white'}}/>
                            <span className='icon-span'>QQ: 761101850</span>
                        </div>
                        <div className='content-icon'>
                            <MailOutlined style={{'fontSize':'24px','color':'white'}}/>
                            <span  className='icon-span'>E-mail: shijing_liu@126.com</span>
                        </div>
                    </div>
                    <div className='content-terms'>
                        <span className='terms-span'>经编数字化车间信息系统</span>
                        <span className='terms-span'>Copyright © 2020 版权所有</span>
                    </div>
                </div>
            </div>
        );
    }
}