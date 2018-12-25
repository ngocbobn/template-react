import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Login from './pages/login';
import AppAdmin from './containers/app';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route
        {...rest}
        render={props => isLoggedIn
            ? <Component {...props} />
            : <Redirect
                to={{
                    pathname: '/login',
                    state: { from: props.location },
                }}
            />}
    />
);

class PublicRouter extends Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <RestrictedRoute history={this.props.history} exact path='/admin' component={AppAdmin} isLoggedIn={true} />
                    <Redirect from='*' to='' />
                </Switch>
            </Router>

        );
    }
}

export default connect(
    state=>({
        isLoggedIn: state.AuthReducers.get('tokenLogin') !== null && state.AuthReducers.get('tokenLogin') !== undefined
    })
)(PublicRouter);