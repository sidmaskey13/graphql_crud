const graphql = require('graphql');
const BookType = require('./book');
const bookData = require('../../book.json')
const authorData = require('../../author.json')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql


// const BookType = new GraphQLObjectType({
//     name: "Book",
//     fields: () => ({
//         id: { type: GraphQLString },
//         name: { type: GraphQLString },
//         genre: { type: GraphQLString },
//         author: {
//             type: AuthorType,
//             resolve(parent, args) {
//                 return authorData.find(i => i.id == parent.author_id)
//             }
//         }
//     })
// });

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return bookData.filter(i => i.author_id == parent.id)
                return _.filter(bookData, { author_id: parent.id })
            }
        }
    })
});

module.exports = AuthorType