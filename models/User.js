const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {

    const User = sequelize.define('User', {

        username: DataTypes.STRING,

        password: DataTypes.STRING,

        image: DataTypes.STRING,

        admin: DataTypes.BOOLEAN,

        email: DataTypes.STRING

    });

    User.associate = function (models) {
        User.hasMany(models.Post, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        })
    }

    User.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    })

    return User;

};