const Sequelize = require("sequelize");
const { STRING, TEXT } = Sequelize.DataTypes;
const conn = require("./conn");

const Campus = conn.define("campus", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image: {
    type: STRING,
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: TEXT,
  },
});

module.exports = Campus;
