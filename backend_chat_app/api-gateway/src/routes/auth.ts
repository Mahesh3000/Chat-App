import express from "express";

const router = express.Router();

router.get("/route", async (req, res) => {
  res.json("i am working");
});

export default router;
