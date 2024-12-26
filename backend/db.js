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

const getMessagesForConversation = async (conversationId) => {
  const query = `
    SELECT messages.id, messages.message, messages.created_at, users.username
    FROM messages
    JOIN users ON users.id = messages.user_id
    WHERE messages.conversation_id = $1
    ORDER BY messages.created_at ASC
  `;
  const result = await dbClient.query(query, [conversationId]);
  return result.rows;
};

const sendMessage = async (conversationId, userId, message) => {
  const query = `
    INSERT INTO messages (conversation_id, user_id, message)
    VALUES ($1, $2, $3) RETURNING id, message, created_at
  `;
  const result = await dbClient.query(query, [conversationId, userId, message]);
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
