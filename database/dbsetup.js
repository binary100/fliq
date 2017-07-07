require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_URL,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
    

db
  .authenticate()
  .then(() => {
    console.log('db connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
