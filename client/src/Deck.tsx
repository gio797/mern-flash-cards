import { useEffect } from "react";
import { API_URL } from "./api/config";
import { useParams } from "react-router-dom";

function Deck() {
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    async function fetchDeck(id: string | undefined) {
      await fetch(`${API_URL}/decks/${id}`)
        .then((res) => res.json())
        .then((data) => console.log(data));
    }

    fetchDeck(id);
  }, []);
  return <div>Deck</div>;
}

export default Deck;
