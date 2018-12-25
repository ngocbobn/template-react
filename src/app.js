import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { store, history } from './redux/store';
import PublicRouter from './router';
import AppLocale from './components/language';
import config from './config';

const cache = new InMemoryCache({
    dataIdFromObject: o => o.id
});
const httpLink = new HttpLink({
    uri: config.graphql,
    credentials: 'same-origin'
})
const wsLink = new WebSocketLink({
    uri: config.wsGraphql,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem('token'),
        }
    }
})
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? token : ''
        }
    }
})
const link = ApolloLink.split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    authLink.concat(httpLink)
)

const client = new ApolloClient({
    link: link,
    cache
});


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locale: 'en'
        }
        if (localStorage.getItem('locale') == null) {
            localStorage.setItem('locale', this.state.locale)
        } else {
            this.state.locale = localStorage.getItem('locale')
        }
        this.changeLocale = this.changeLocale.bind(this)
    }
    changeLocale(value) {
        if (AppLocale[value] != undefined) {
            localStorage.setItem('locale', value)
            this.state.locale = value
            window.location.reload()
        }
    }
    render() {
        return (
            <LocaleProvider locale={AppLocale[this.state.locale].antd}>
                <IntlProvider locale={this.state.locale} messages={AppLocale[this.state.locale].messages}>
                    <ApolloProvider client={client}>
                        <Provider store={store}>
                            <PublicRouter history={history} changeLocale={this.changeLocale}></PublicRouter>
                        </Provider>
                    </ApolloProvider>
                </IntlProvider>
            </LocaleProvider>
        );
    }
}

export default App;