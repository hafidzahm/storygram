'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Profile, {foreignKey: 'ProfileId'})
      Post.belongsToMany(models.Tag, {
        through: 'PostTags'
      })
    }

    static async showAllProfilePosts() {
      try {
        let data = await Post.findAll({
          include: 'Profile'
        })
        return data
      } catch (error) {

        throw error
      }
    }
  }
  Post.init({
    titlePost: DataTypes.STRING,
    picturePost: DataTypes.STRING,
    captionPost: DataTypes.STRING,
    ProfileId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Profiles',
        id: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};