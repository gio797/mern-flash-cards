import Deck from "../models/Deck.js";

export async function getDeckController(req, res) {
  const { id } = req.params;
  const deck = await Deck.findById(id);
  res.json(deck);
}
