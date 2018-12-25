import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

class SideBar extends Component {
    render() {
        return (
            <Sider style={{
                overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
            }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/admin">
                            <Icon type="home" />
                            <span className="nav-text">Dashboard</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/admin/deposit">
                            <Icon type="download" />
                            <span className="nav-text">Deposit</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/admin/withdraw">
                            <Icon type="upload" />
                            <span className="nav-text">Withdraw</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/admin/wallet">
                            <Icon type="wallet" />
                            <span className="nav-text">Wallet</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default SideBar;