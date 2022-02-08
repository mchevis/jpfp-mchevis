const Sequelize = require("sequelize");
const { STRING, DECIMAL } = Sequelize.DataTypes;
const conn = require("./conn");

const Student = conn.define("student", {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  image: {
    type: STRING,
    defaultValue: "/placeholder-image-person-jpg.jpeg",
  },
  gpa: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDecimal: true, //float (checks for floating points) or decimal (checks for any numbers)?
      min: 0.0,
      max: 4.0,
    },
  },
});

module.exports = Student;
