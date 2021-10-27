import Sequelize from "sequelize";

const sequelize = new Sequelize(
  "postgres://ddfsgubi:axHM1clfzBApV-SeLtgrk9AuHx-u3q8p@fanny.db.elephantsql.com/ddfsgubi",
  {
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  }
);

export default sequelize;
