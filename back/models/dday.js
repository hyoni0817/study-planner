const DataTypes = require('sequelize');
const { Model } = DataTypes;

const moment = require('moment');
module.exports = class Dday extends Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            memo: {
                type: DataTypes.TEXT,
                allowNull: false,
                defaultValue: 'N',
            },
            dueDate: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    return moment(this.getDataValue('dueDate')).format('YYYY-MM-DD')
                }
            },
            viewState: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            }
        }, {
            modelName: 'Dday',
            tableName: 'ddays',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            sequelize,
        });
    }
    static associate(db){
        // db.Dday.belongsTo(db.User);
    }
};