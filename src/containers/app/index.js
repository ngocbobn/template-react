import React, { Component } from 'react';
import { Layout } from 'antd';
import SideBar from '../../components/sidebar';
import Router from './router';
import Footer from './footer';

const { Header, Content } = Layout;

class AppAdmin extends Component {
    render() {
        const { url } = this.props.match;
        return (
            <Layout>
                <SideBar />
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <Router url={url} />
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        )
    }
}

export default AppAdmin;