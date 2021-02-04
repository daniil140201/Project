const Sequelize = require('sequelize')
const sequelize = new Sequelize("booking", "root", "QWEDCXZAs123", {
    dialect : "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
});
const User = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull : false,
    },
    surname: {
        type: Sequelize.STRING,
        allowNull : false,
    },
    age:{
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    mail: {
        type: Sequelize.STRING,
        unique : true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    }

})
const Apartment = sequelize.define('apartments', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    addres: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    date_end:{
        type: Sequelize.STRING,
        allowNull: false
    }
})
const Book = sequelize.define('books', {
    date_in: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date_out: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    }
})
User.hasMany(Apartment);
Apartment.belongsTo(User);
Apartment.hasMany(Book);
User.hasMany(Book);
Book.belongsTo(Apartment);
Book.belongsTo(User);

exports.seq = sequelize;
exports.User = User;
exports.Book = Book;
exports.Apartment = Apartment;