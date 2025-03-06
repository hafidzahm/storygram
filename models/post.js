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

    toMinutesAgoFormat() {
      const date = new Date(this.createdAt)
      const now = new Date();
      const diffInMs = now - date;
      const minutesAgo = Math.floor(diffInMs / (1000 * 60));
      return `${minutesAgo} minutes ago`;
    }
    
    static associate(models) {
      // define association here
      Post.belongsTo(models.Profile, {foreignKey: 'ProfileId'})
      Post.belongsToMany(models.Tag, {
        through: 'PostTags',
        onDelete: 'CASCADE'
      })
    }

    static async showAllProfilePosts() {
      try {
        let data = await Post.findAll({
          include: ['Profile', 'Tags']
        })
        return data
      } catch (error) {

        throw error
      }
    }
  }
  Post.init({
    titlePost: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Judul postingan jangan kosong!`
        } 
      }
    },
    picturePost: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Gambar harus diupload!`
        }
      }
    },
    captionPost:{
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Caption jangan kosong!`
        }
      }
    },
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