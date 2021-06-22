const graphql = require('graphql');
const AuthorType = require('./author');
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString } = graphql

const authorData = require('../../author.json')

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authorData.find(i => i.id == parent.author_id)
            }
        }
    })
});

module.exports = BookType