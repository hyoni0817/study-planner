const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init({
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
            terms: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            birthYear: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            sequelize,
        });
    }

    static associate(db) {
        db.User.hasMany(db.Dday);
        db.User.hasMany(db.Todo, {as: 'Todos'});
        db.User.hasMany(db.Todo, {as: 'CompletedTodos'});
    }
}