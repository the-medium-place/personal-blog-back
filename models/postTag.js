module.exports = function(sequelize, DataTypes) {

    const postTag = sequelize.define('postTag', {
        PostId: DataTypes.INTEGER,
        TagId: DataTypes.INTEGER


    });

    return postTag;

    };