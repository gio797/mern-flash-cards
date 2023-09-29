import Deck from "../models/Deck.js";

export async function deleteCardOnDeckController(req, res) {
  const id = req.params.id;
  const index = req.params.index;
  const deck = await Deck.findById(id);
  if (!deck) return res.status(400).send("no deck of this id exists!");
  deck.cards.splice(parseInt(index), 1);
  await deck.save();
  res.json(deck);
}
