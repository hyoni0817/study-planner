const { sequelize } = require(".");

module.exports = ( sequelize, DataTypes ) => {
    const Dday = sequelize.define( 'Dday', {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'N',
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        charset: 'utf8mb64',
        collate: 'utf8mb64_general_ci',
    });

    Dday.associate = (db) => {
        db.Dday.belongsTo(db.User);
    };

    return Dday;
}