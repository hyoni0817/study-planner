const DataTypes = require('sequelize');
const { Model } = DataTypes;

const moment = require('moment');

module.exports = class Todo extends Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            subject: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER(3),
                allowNull: false,
            },
            unit: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            startTime: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: 'none',
            },
            endTime: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: 'none',
            },
            allDayStatus: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            important: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            completion: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD')
                }
            }
        }, {
            modelName: 'Todo',
            tableName: 'todos',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            sequelize,
        });
    }
    static associate(db) {
        db.Todo.belongsTo(db.User);
    }
};