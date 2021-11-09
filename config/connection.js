const Sequelize = require('sequelize');
const config = require('./config')
require('dotenv').config();

let sequelize;
if (true ) {//config.use_env_variable
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  //   sequelize = new Sequelize(config.database, config.username, config.password, config);
  // }
  
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306
      // dialectOptions: {
      //   socketPath: '127.0.0.1',
      // }
    }
  );
}
module.exports = sequelize;