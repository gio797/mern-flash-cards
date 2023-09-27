import express from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck.js";
import "dotenv/config";

const PORT = 5000;

const app = express();
app.use(express.json());

app.get("/decks", async (req, res) => {
  const decks = await Deck.find({});
  res.json(decks);
});

app.post("/decks", async (req, res) => {
  const data = req.body;
  const newDeck = new Deck(data);
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, console.log("listening"));
});
