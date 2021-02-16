module.exports = function (sequelize, DataTypes) {

    const Image = sequelize.define('Image', {

        url: DataTypes.STRING

    });
    Image.associate = function (models) {

        Image.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Image;

};