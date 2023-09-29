import React, { useState } from "react";
import "./App.css";
import { useParams } from "react-router-dom";

import { createCard } from "./api/createCard";

function Deck() {
  const [text, setText] = useState("");
  // const [decks, setDecks] = useState<DeckType[]>([]);
  const params = useParams();
  const id = params.id?.split(":")[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const deck = await createCard(id!, text);
    // setDecks((prevDecks) => [...prevDecks, deck]);
    setText("");
  };

  // useEffect(() => {
  //   async function fetchDecks() {
  //     const newDecks = await getDecks();
  //     setDecks(newDecks);
  //   }

  //   fetchDecks();
  // }, []);

  // async function handleDelete(id: string) {
  //   await deleteDeck(id);
  //   setDecks((prevDecks) => prevDecks.filter((deck) => deck._id !== id));
  // }

  return (
    <div className="deck">
      {/* <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <Link to={`/decks/:${deck._id}`}>{deck.title}</Link>
            <button onClick={() => handleDelete(deck._id)}>X</button>
          </li>
        ))}
      </ul> */}
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
