module.exports = function (sequelize, DataTypes) {

    const Comment = sequelize.define('Comment', {

        text: DataTypes.TEXT,

        approved: DataTypes.BOOLEAN,

        name: DataTypes.STRING,

        email: DataTypes.STRING

    });
    Comment.associate = function (models) {

        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Comment;

};