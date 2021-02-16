module.exports = function (sequelize, DataTypes) {

    const Tag = sequelize.define('Tag', {

        text: DataTypes.STRING

    });
    Tag.associate = function (models) {

        Tag.belongsToMany(models.Post, {
            through: 'postTags'
        });
    }
    return Tag;

};