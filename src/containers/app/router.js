import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Dashboard from '../dashboard';

class RouterAdmin extends Component {
    render() {
        const { url } = this.props;
        return (
            <Switch>
                <Route exact path={`${url}/`} component={Dashboard} />
            </Switch>
        );
    }
}

export default RouterAdmin;