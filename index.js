const { Sequelize, DataTypes, HasMany } = require('sequelize');


const sequelize = new Sequelize('biblio', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },

}, {
    tableName: 'users'
});

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'reviews'
});

; (async () => {
    try {
        await User.sync({
            alter: true,
            force: false
        })
        await Review.sync({
            alter: true,
            force: false
        })
        // 1
        const user = await User.findAll();
        console.log(user);
        // 3
        const userE = await User.findAll({
            where: {
                country: 'England'
            }
        });
        console.log(userE);
        // 2
        const review = await Review.findByPk(1);
        if (review === null) {
            console.log('Not found!');
        } else {
            console.log(review instanceof Review);
        }
        //   4
        const new_review = await Review.create({
            author_id: 10,
            book_id: 15,
            text: 'Very good!'
        });
        console.log(new_review.id);
        // 5
        await User.destroy({
            where: {
                firstName: "Ann"
            }
        });
        //   6       
        const up_user = await User.update({ lastName: "Potter" }, {
            where: {
                id: 3
            }
        });
        console.log(up_user);
        // 7
        User.hasMany(Review);
       
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
