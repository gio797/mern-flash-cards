import DeckModel from "../models/Deck.js";

export async function getDecksController(req, res) {
  const decks = await DeckModel.find();
  res.json(decks);
}
