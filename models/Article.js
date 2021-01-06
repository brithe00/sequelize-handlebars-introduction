const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Article = db.define(
  "Article",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    tableName: "article",
  }
);

module.exports = Article;
