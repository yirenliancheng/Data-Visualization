import React from 'react';
import './index.less';
import { SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import { Button } from 'antd';

export default class Movie extends React.PureComponent {
    render() {
        return (
            <div className='vedio-wrap'>
                <video preload='auto' loop={true} playsInline={true} autoPlay={true} muted={true} className='_vedio'>
                    <source src='./static/vedio/homenew.mp4' type="video/mp4" />
                </video>
                <div className='vedio-onlay'>
                    <div className='onlay-font onlay'>
                        <div>
                            <SwapLeftOutlined style={{ 'fontSize': '54px' }} />
                            <span className='onlay-sp-margin'>万物互联</span>
                            <span className='onlay-sp-margin'>智慧触及</span>
                            <SwapRightOutlined style={{ 'fontSize': '54px' }} />
                        </div>
                        <div className='door'>
                            <div className='button-flex'>
                                <div className='left-button door-button'></div>
                                <div className='onlay-button door-button'></div>
                                <div className='right-button door-button'></div>
                            </div>
                            <Button type="link" className='btn'>
                                <a href='https://www.baidu.com'>
                                   开启 
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}