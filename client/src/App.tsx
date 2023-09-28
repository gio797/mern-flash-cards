import React, { useEffect, useRef, useState } from "react";
import "./App.css";

type DeckType = {
  title: string;
  _id: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<DeckType[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deck = await response.json();
    setDecks((prevDecks) => [...prevDecks, deck]);
    setTitle("");
  };

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }

    fetchDecks();
  }, []);

  async function handleDelete(id: string) {
    await fetch(`http://localhost:5000/decks/${id}`, {
      method: "DELETE",
    });
    setDecks((prevDecks) => prevDecks.filter((deck) => deck._id !== id));
  }

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            {deck.title}
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
