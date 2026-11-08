import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { Sequelize } from "sequelize";

const dbUrl = process.env.DATABASE_URL || "postgresql://postgres:3345@localhost:5432/food_delivery";

const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  logging: false,
  dialectOptions: process.env.NODE_ENV === "production" ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } : {},
});

export const ConnectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL DB Connected");
    // Sync all models (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log("All tables synced");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default sequelize;
