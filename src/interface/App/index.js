import React from 'react'
import gql from 'graphql-tag'

import { Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'

const GET_ITEMS = gql`
    {
        items @client {
            id
            value
        }
    }
`

const Items = ({ items }) => (
    <Query query={GET_ITEMS}>
        {({ data: { items } }) => items.map((item, index) => <Item key={index} item={item} />)}
    </Query>
)
const Item = ({ item }) => <div>{item.value}</div> 

const ADD_ITEM = gql`
    mutation addItem($text: String!) {
        addItem(value: $text) @client {
            id
        }
    }
`

const Form = () => (
    <Mutation mutation={ADD_ITEM}>
        {(addItem) => {
            let input
            return (
                <div>
                    <form
                        onSubmit={(evt) => {
                            evt.preventDefault()
                            const value = input.value.trim()
                            if (value) {
                                addItem({ variables: { text: value } })
                            }
                            input.value = ''
                        }}
                    >
                        <input ref={(node) => { input = node}}/>
                        <button type="submit">add</button>
                    </form>
                </div>
            )
        }}
    </Mutation>
)

const App = () => (
    <Fragment>
        <Items />
        <Form />
    </Fragment>
)

export default App

