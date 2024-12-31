const { Client } = require("pg");
require("dotenv").config(); // Load environment variables from .env file

// console.log("dbConfig", dbConfig);

const dbClient = new Client({
  user: process.env.DB_USER, // Database user
  host: process.env.DB_HOST, // Database host
  database: process.env.DB_NAME, // Database name
  password: process.env.DB_PASSWORD, // Database password
  port: process.env.DB_PORT, // Database port
});

// Connect to the database
const connectDB = async () => {
  try {
    await dbClient.connect();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

// Function to check if a user exists by email
const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await dbClient.query(query, [email]);
  return result.rows[0];
};

// Function to insert a new user into the database
const insertUser = async (username, email, hashedPassword, profilePic) => {
  const query = `
      INSERT INTO users (username, email, password, profile_pic)
      VALUES ($1, $2, $3, $4) RETURNING id, username, email
  `;
  const result = await dbClient.query(query, [
    username,
    email,
    hashedPassword,
    profilePic,
  ]);
  return result.rows[0];
};

const getAllUsers = async () => {
  const query = "SELECT id, username, profile_pic FROM users";

  const result = await dbClient.query(query);
  return result.rows;
};

const getMessagesForConversation = async (userId, otherUserId) => {
  const query = `
    SELECT id, sender_id, receiver_id, message, timestamp
    FROM messages
    WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
    ORDER BY timestamp ASC
  `;
  const result = await dbClient.query(query, [userId, otherUserId]);
  return result.rows;
};

const sendMessage = async (senderId, receiverId, message) => {
  const query = `
    INSERT INTO messages (sender_id, receiver_id, message, timestamp)
    VALUES ($1, $2, $3, NOW())
    RETURNING id, sender_id, receiver_id, message, timestamp
  `;
  const result = await dbClient.query(query, [senderId, receiverId, message]);
  return result.rows[0];
};

// Function to close the database connection
const closeDB = async () => {
  await dbClient.end();
};

module.exports = {
  connectDB,
  getUserByEmail,
  insertUser,
  getMessagesForConversation,
  getAllUsers,
  sendMessage,
  closeDB,
};
