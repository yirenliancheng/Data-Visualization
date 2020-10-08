import React from "react";
import { Menu } from "antd";
import { Link } from 'react-router-dom';
import { HomeOutlined, AreaChartOutlined, AndroidOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import "./index.less";

export default class Nav extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            current: 'home'
        }
    }
    
    render() {
        return (
            <>
                <Menu
                    onClick={(e) => {this.setState({current:e.key})}}
                    selectedKeys={this.state.current}
                    mode="horizontal"
                    className="nav"
                    >
                    <Menu.Item key="home" icon={<HomeOutlined style={{'fontSize':'22px'}}/>}>
                        <Link to={'/'} className='nav-link'>首页</Link>
                    </Menu.Item>
                    <Menu.Item key="datashow" icon={<AreaChartOutlined style={{'fontSize':'22px'}}/>}>
                        <Link to={'/datashow'}  className='nav-link' target='_blank'>数据可视化</Link>
                    </Menu.Item>
                    <Menu.Item key="airplan" icon={<AndroidOutlined style={{'fontSize':'22px'}}/>}>
                        <Link to={'/aiplan'}  className='nav-link'>生产调度算法</Link>
                    </Menu.Item>
                </Menu>
            </>
        )
    }

}