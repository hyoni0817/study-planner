const { sequelize } = require(".");

module.exports = ( sequelize, DataTypes ) => {
    const User = sequelize.define( 'User', {
        userId: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
        }, 
        nickname: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        term: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        birthYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });

    User.associate = (db) => {
        db.User.hasMany(db.Dday);
        db.User.hasMany(db.Todo);
    };

    return User;
}