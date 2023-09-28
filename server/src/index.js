import express from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck.js";
import "dotenv/config";
import cors from "cors";

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/decks", async (req, res) => {
  const decks = await Deck.find();
  res.json(decks);
});

app.post("/decks", async (req, res) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.delete("/decks/:id", async (req, res) => {
  const id = req.params.id;
  const deck = await Deck.findByIdAndDelete(id);
  res.json(deck);
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, console.log("listening"));
});
