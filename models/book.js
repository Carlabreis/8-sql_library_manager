"use strict";
const { Model } = require("sequelize");
// https://github.com/validatorjs/validator.js
// import validator from 'validator';

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        //check if this works (isEmpty from validator library)
        isEmpty: {
          msg: "This field can't be empty."
        }
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        //check if this works
        isEmpty: {
          msg: "This field can't be empty."
        }
      },
      genre: DataTypes.STRING,
      year: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
