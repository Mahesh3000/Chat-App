require("dotenv").config(); // Load environment variables from .env file

module.exports = {
  dbConfig: {
    host: process.env.DB_HOST || "127.0.0.1", // PostgreSQL host
    port: process.env.DB_PORT || 5432, // PostgreSQL port
    user: process.env.DB_USER, // Database user
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME, // Database name
  },
};
