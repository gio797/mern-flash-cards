import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { createDeck } from "./api/createDeck";
import { DeckType, getDecks } from "./api/getDecks";
import { deleteDeck } from "./api/deleteDeck";

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<DeckType[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const deck = await createDeck(title);
    setDecks((prevDecks) => [...prevDecks, deck]);
    setTitle("");
  };

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }

    fetchDecks();
  }, []);

  async function handleDelete(id: string) {
    await deleteDeck(id);
    setDecks((prevDecks) => prevDecks.filter((deck) => deck._id !== id));
  }

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <Link to={`/decks/:${deck._id}`}>{deck.title}</Link>
            <button onClick={() => handleDelete(deck._id)}>X</button>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="deck-title">Deck title</label>
        <input
          type="text"
          placeholder="title"
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;

// type Deck = {
//   _id: string;
//   title: string;
// };

// function App() {
//   const [title, setTitle] = useState("");
//   const [decks, setDecks] = useState<Deck[]>([]);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   useEffect(() => {
//     axios
//       .get<Deck[]>("http://localhost:5000/decks")
//       .then((res) => setDecks(res.data));
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     axios.post("http://localhost:5000/decks", { title });
//     setTitle("");
//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//   };

//   return (
//     <div className="App">
//       <div className="decks">
//         {decks && decks.map((deck) => <h3 key={deck._id}>{deck.title}</h3>)}
//       </div>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <label htmlFor="title">Deck title</label>
//         <input
//           ref={inputRef}
//           type="text"
//           placeholder="title"
//           name="title"
//           value={title}
//           id="title"
//           onChange={(e) => handleChange(e)}
//         />
//         <button>Create Deck</button>
//       </form>
//     </div>
//   );
// }
