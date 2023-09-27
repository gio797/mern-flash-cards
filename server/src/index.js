import express from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck.js";
import bodyParser from "body-parser";

const PORT = 5000;

const app = express();
app.use(bodyParser.json());

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

mongoose
  .connect(
    "mongodb+srv://giomuchaidze:chelsea123@cards-claster.yok3xyg.mongodb.net/"
  )
  .then(() => {
    app.listen(PORT, console.log("listening"));
  });
