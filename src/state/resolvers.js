import gql from 'graphql-tag'

let nextId = 0 

export const defaults = {
    items: [],
    filter: 'MAGIC'
}

export const typeDefs = `
    type Item {
        id: Int!
        value: String!
    }

    type Mutation {
        addItem(value: String!): Item
    }

    type Query {
        items: [Item]
    }
`

export const resolvers = {
    Mutation: {
        addItem: (_, { value }, { cache }) => {
            const query = gql`
                query GetItems {
                    items @client {
                        id
                        value
                    }
                }
            `
            const previous = cache.readQuery({ query })
            const newItem = {
                id: nextId++,
                value,
                __typename: 'Item'
            }
            const data = {
                items: previous.items.concat([newItem])
            }
            cache.writeData({ data })
            return newItem
        }
    }
}
