import { API_URL } from "./config";
import { DeckType } from "./getDecks.ts";

export async function createCard (id: string, text: string):Promise<DeckType> {
    const response = await fetch(`${API_URL}/decks/${id}/cards`, {
        method: "POST",
        body: JSON.stringify({
          text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json()
}