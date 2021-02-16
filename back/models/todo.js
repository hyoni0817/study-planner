const { sequelize } = require(".");

module.exports = ( sequelize, DataTypes ) => {
    const Todo = sequelize.define( 'Todo', {
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
            type: DataTypes.STRING(5),
            allowNull: false,
            defaultValue: 'none',
        },
        endTime: {
            type: DataTypes.STRING(5),
            allowNull: false,
            defaultValue: 'none',
        },
        allDayStaus: {
            type: DataTypes.boolean(false),
            allowNull: false,
        },
        important: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });

    Todo.associate = (db) => {
        db.Todo.belongsTo(db.User);
    };
    
    return Todo;
}