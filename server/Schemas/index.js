const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull } = graphql
const UserType = require('./TypeDefs/userType')
// const BookType = require('./TypeDefs/book')
// const AuthorType = require('./TypeDefs/author')
const { AuthorType, BookType } = require('./TypeDefs/mixed')
const bookSchema = require('../Models/Book')
const authorSchema = require('../Models/Author')
const userData = require('../mock_data.json')
const _ = require('lodash')
const authorData = require('../author.json')
const bookData = require('../book.json')


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return userData
            }
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(bookData, { id: args.id })
                return bookData.find(i => i.id == args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log(args.id)
                return authorSchema.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return bookSchema.find()
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authorSchema.find()
            }
        }



    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                userData.push({
                    id: userData.length + 1, firstName: args.firstName, lastName: args.lastName, email: args.email, password: args.password
                })
                return args
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let new_data = new authorSchema({
                    name: args.name,
                    age: args.age,
                })
                new_data.save()
                return args
            }
        },
        editAuthor: {
            type: AuthorType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let authorData = {
                    name: args.name,
                    age: args.age
                }
                const update = authorSchema.findOneAndUpdate({ _id: args.id }, { $set: authorData })
                return update
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                author_id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let new_data = new bookSchema({
                    name: args.name,
                    genre: args.genre,
                    author_id: args.author_id,
                })
                new_data.save()
                return args
            }
        }
    }
})


module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
