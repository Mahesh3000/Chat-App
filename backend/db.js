const { Client } = require("pg");
const { dbConfig } = require("./config");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "chatApp",
  password: "Eldorado@123",
  port: 5432,
});
// Connect to the database
client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Database connection error", err.stack);
  });

module.exports = client;
