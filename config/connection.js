const Sequelize = require('sequelize');
require('dotenv').config();

sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: '127.0.0.1',  // <-- Make sure this is set to IPv4
    dialect: 'mysql',
    port: 3306
  }
);


module.exports = sequelize;
