import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import gql from 'graphql-tag';
const { Header, Content } = Layout;

const 

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Header style={{ padding: 0, background: '#f0f2f5' }} >
                    <h2>Admin page</h2>
                </Header>
                <Content style={{ padding: 24, background: '#fff' }}>
                    Admin
                </Content>
            </Fragment>
        );
    }
}

export default Home;
