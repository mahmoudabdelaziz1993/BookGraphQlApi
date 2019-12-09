const Book = require("../models/Book");
const Author = require('../models/Author');
const graphql = require('graphql');
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLSchema, GraphQLID, GraphQLList } = graphql;
let books = [
    { title: "book1", id: "1", description: " book test ", price: 2.5, num_copy: 5, authorId: "1" },
    { title: "book1", id: "2", description: " book test ", price: 2.5, num_copy: 5, authorId: "1" },
    { title: "book1", id: "3", description: " book test ", price: 2.5, num_copy: 5, authorId: "2" },
    { title: "book1", id: "4", description: " book test ", price: 2.5, num_copy: 5, authorId: "2" },
]

let author = [
    { id: "1", name: " mahmoud " },
    { id: "2", name: " ahmed " }
]


// define Book type 
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        genre: { type: GraphQLString },
        num_copy: { type: GraphQLFloat },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // code to find the author of the book 
                return Author.findById (parent.authorId);
            }
        }


    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find ({authorId:parent.id})            }
        }
    })
});

// define  root query's 

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from DB or other source 
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find();
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find();
            }
        }
    }
})
const Mutations = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name
                })
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLString },
                genre: { type: GraphQLString },
                num_copy: { type: GraphQLInt },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let { title, description, price, genre, num_copy, authorId } = args
                let book = new Book({
                    title, description, price, genre, num_copy, authorId
                })
                return book.save();
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations

})