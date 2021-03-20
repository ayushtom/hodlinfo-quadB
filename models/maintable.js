'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mainTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  mainTable.init({
    mainData: DataTypes.JSON,
    pair: DataTypes.STRING
  }, {
    sequelize,
    tableName:"mainTable",
    modelName: 'mainTable',
  });
  return mainTable;
};