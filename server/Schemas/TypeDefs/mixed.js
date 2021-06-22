const graphql = require('graphql');
const bookData = require('../../book.json')
const authorData = require('../../author.json')
const _ = require('lodash')
const bookSchema = require('../../Models/Book')
const authorSchema = require('../../Models/Author')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql


const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // return authorData.find(i => i.id == parent.author_id)
                return authorSchema.findById(parent.author_id)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return bookSchema.find({ author_id: parent.id })
            }
        }
    })
});

module.exports = { AuthorType, BookType }