import { API_URL } from "./config";
import { DeckType } from "./getDecks";

export async function deleteCard(id: string, index:number):Promise<DeckType> {
    const response =  await fetch(`${API_URL}/decks/${id}/cards/${index}`, {
      method: "DELETE",
    });
    return response.json()
}