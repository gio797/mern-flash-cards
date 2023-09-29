import Deck from "../models/Deck.js";

export async function createCardForDeckController(req, res) {
  const id = req.params.id;
  const deck = await Deck.findById(id);
  if (!deck) return res.status(400).send("no deck of this id exists!");
  const { text } = req.body;
  deck.cards.push(text);
  await deck.save();
  res.json(deck);
}
