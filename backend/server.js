const express = require("express");
const { Client } = require("pg");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./db");

// Your routes and other server logic here
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
