
export const { Sequelize } = require("sequelize");

export const connectDatabase = new Sequelize(process.env.DATABASE_URL, {
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});
