module.exports = function (sequelize, DataTypes) {

    const Post = sequelize.define('Post', {

        title: DataTypes.STRING,

        text: DataTypes.TEXT,

        image1url: DataTypes.STRING,
        image2url: DataTypes.STRING,
        image3url: DataTypes.STRING



    });

    Post.associate = function (models) {
        Post.belongsTo(models.User);
        Post.belongsToMany(models.Tag, {
            through: 'postTags'
        })
        // Post.hasMany(models.Image, {
        //     onDelete: 'CASCADE',
        //     foreignKey: {
        //         allowNull: false
        //     }
        // })
        Post.hasMany(models.Comment, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        })

    }

    return Post;

};