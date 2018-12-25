import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox, Row, Col
} from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADMIN_LOGIN = gql`
mutation Login($username: String!, $password: String!){
  login (username: $username, password: $password){
    token
  }
}`;

const FormItem = Form.Item;
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { username, password } = this.state
        return (
            <Row type="flex" justify="center">
                <Col>
                    <Form onSubmit={this.handleSubmit} className="login-form" id="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={e => this.setState({ username: e.target.value })} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <br />
                            <Mutation
                                mutation={ADMIN_LOGIN}
                                variables={{ username, password }}
                                onError={e => console.log(e.message)}
                                onCompleted={e => {
                                    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) this.props.history.push('/dashboard')
                                }}
                                update={(cache, { data: { login } }) => {
                                    localStorage.setItem('token', login.token)
                                }}
                            >
                                {loginMutation => <Button type="primary" onClick={loginMutation} className="login-form-button">
                                    Log in
                                </Button>}
                            </Mutation>
                            Or <a href="">register now!</a>
                        </FormItem>
                    </Form>
                </Col>
            </Row >
        );
    }
}
const LoginForm = Form.create()(Login);
export default LoginForm;
