import React from 'react'
import { render } from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { defaults, resolvers, typeDefs } from './state/resolvers'

import { ApolloProvider } from 'react-apollo'
import App from './interface/App'

const cache = new InMemoryCache()
const link = withClientState({ defaults, resolvers, cache, typeDefs })
const client = new ApolloClient({ cache, link })

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
