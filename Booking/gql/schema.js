const { buildSchema } = require('graphql');
const schema = buildSchema(`
    type User {
    id : Int
    name : String
    surname : String
    age : Int
    mail : String
    password : String
    role : String
    }
    type Apartment {
    id : Int
    userId : Int
    title : String
    addres : String
    price : Int
    date_end : String
    }
    type Book {
    userId : Int
    apartmentId : Int
    date_in : String
    date_out : String
    id : Int
    }
    type Query {
    getUsers : [User!]!
    getApartments : [Apartment!]
    getApartment(id : Int) : Apartment
    login(mail : String, password : String) : String!
    findUserApartment(userId : Int) : [Apartment]
    findAvailableApartment(userId : Int): [Apartment]
    getBooks : [Book]
    getApartmentsDates(id : Int) : [Book],
    getUserBooks(id : Int) : [Book]
    getUserBooksApartments(id : Int) : [Apartment]
    
    }
    type Mutation{
    createApartment(userId : Int!, title : String!, addres : String!, price : Int!, date_end : String!) : Apartment
    register( name : String, surname : String, age : Int, mail : String, password : String, role : String) : String!
    createBook( userId : Int, apartmentId : Int, date_in : String, date_out : String) : Book 
    }
`)
module.exports = schema