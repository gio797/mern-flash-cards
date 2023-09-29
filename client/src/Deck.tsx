import React, { useEffect, useState } from "react";
import "./App.css";
import { useParams } from "react-router-dom";

import { createCard } from "./api/createCard";
import { getDeck } from "./api/getDeck";
import { DeckType } from "./api/getDecks";
import { deleteCard } from "./api/deleteCard";

function Deck() {
  const [deck, setDeck] = useState<DeckType | undefined>();
  const [text, setText] = useState("");
  const [cards, setCards] = useState<string[]>([]);

  const params = useParams();
  const id = params.id?.split(":")[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { cards: serverCards } = await createCard(id!, text);
    setCards(serverCards);
    setText("");
  };

  useEffect(() => {
    async function fetchDeck() {
      if (!id) return;
      const newDeck = await getDeck(id);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }

    fetchDeck();
  }, [id]);

  async function handleDeleteCard(index: number) {
    if (!id) return;
    const newDeck = await deleteCard(id, index);
    setCards(newDeck.cards);
  }

  return (
    <div>
      <h2>{deck?.title}</h2>
      <ul className="decks">
        {cards.map((card, index) => (
          <li key={index}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="deck-text">Card text</label>
        <input
          type="text"
          placeholder="text"
          id="deck-text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
        <button>Create card</button>
      </form>
    </div>
  );
}

export default Deck;
