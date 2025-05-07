import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } from "./config.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, (
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql'
  }
));

// await sequelize.sync({ force: true });
// console.log('All models were synchronized successfully.');

export default sequelize;