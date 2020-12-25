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