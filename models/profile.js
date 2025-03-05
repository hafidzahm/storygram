'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.hasMany(models.Post)
      Profile.belongsTo(User, {foreignKey: 'UserId'})
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    UserId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        id: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};