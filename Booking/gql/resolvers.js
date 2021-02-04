
const {where} =  require("sequelize");
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../sequelize/seq').User
const Apartment = require('../sequelize/seq').Apartment
const Book = require('../sequelize/seq').Book
const sault = 'danyaBooking';

async function findAps(books){
    let aps = [];
    for(let obj of books){
        aps.push(await Apartment.findOne({where : {id : obj.apartmentId}}))
    }
    return aps
}
const genToken = (id, role) =>{
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, sault, {expiresIn: "24h"})
}
async function getUsers() {
    console.log(User)
    let user = await User.findAll({raw : true});
    return user
}
async function createApartment( {userId, title, addres, price, date_end}) {
let dateEnd = Date.parse(date_end)
    let res = await Apartment.create({
        userId,
        title,
        addres,
        price,
        date_end :dateEnd
    });
    return res
}
async function getApartments(){
    let apartments = await Apartment.findAll({raw : true});
    return apartments;
}
async function register({name, surname, age, mail, password, role} ) {
    let candidate = await User.findOne({ where: { mail: mail } });
    if(candidate){
        return Error("such user is already registered")
    }
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(mail) === false){
        return Error('invalid mail');
    }
    if (password.length === 0 || password.replace(/\s/g, '') === 0){
        return Error('invalid password')
    }
    let hashedPassword = bcrypt.hashSync(password, 10);
    let user = await User.create({
        name,
        surname,
        age,
        mail,
        password : hashedPassword,
        role
    })
    return user.id
}
async function login({mail, password}){
    let user = await User.findOne({where : {mail}});
    if (!user){
        return Error('this user has not been found')
    }
    let validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword){
        return Error("Incorrect password")
    }
    return genToken(user.id, user.role);
}
async function findUserApartment({userId}) {
    let apartments = await Apartment.findAll({where :{ userId :  userId}})
    return apartments;
}
async function findAvailableApartment({userId}) {
    let apartments = await Apartment.findAll({where :{ userId : {[Op.not] : userId }}})
    return apartments;
}
async function getBooks() {
    return await Book.findAll({raw: true})
}
async function createBook({userId, apartmentId, date_in, date_out}){
    let dateIn = Date.parse(date_in)
    let dateOut = Date.parse(date_out)
    let apartment = await Apartment.findByPk(apartmentId);
    let prevBooks = await Book.findAll({where : {apartmentId : apartmentId}})
    if (prevBooks.length !== 0){
        for (let obj of prevBooks){
            if(dateIn <= parseInt(obj.date_in) && dateOut >= parseInt(obj.date_in) || dateIn <= parseInt(obj.date_out) && dateOut >= parseInt(obj.date_out)){
                return Error('Выбранная дата уже занята')
            }
        }
    }
    let book = await Book.create({userId,apartmentId,date_in : dateIn, date_out: dateOut })
    return book;
}
async function getApartment({id}) {
    let ap = await Apartment.findByPk(id);
    return  ap;
}
async function getApartmentsDates({id}){
    let booksDates = await Book.findAll({where : {apartmentId : id}});
    return booksDates;
}
async function getUserBooks({id}){
    let books = await Book.findAll({where : {userId : id}, raw : true})
    return books
}
async function getUserBooksApartments({id}){
    let books = await Book.findAll({where : {userId : id}, raw : true})
    let appartments = findAps(books)
    return appartments
}

const root = {
    getUsers,
    createApartment,
    getApartments,
    register,
    login,
    findUserApartment,
    findAvailableApartment,
    getBooks,
    createBook,
    getApartment,
    getApartmentsDates,
    getUserBooks,
    getUserBooksApartments
}
module.exports = root;