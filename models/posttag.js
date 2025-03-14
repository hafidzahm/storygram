'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostTag.init({
    TagId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tags',
        id: 'id'
      },
      onDelete: 'CASCADE'
    },
    PostId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        id: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'PostTag',
  });
  return PostTag;
};