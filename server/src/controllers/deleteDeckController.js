import Deck from "../models/Deck.js";

export async function deleteDeckController(req, res) {
  const id = req.params.id;
  const deck = await Deck.findByIdAndDelete(id);
  res.json(deck);
}
