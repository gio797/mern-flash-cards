import { API_URL } from "./config";
import { DeckType } from "./getDecks";


export async function getDeck (id:string):Promise<DeckType> {
    const response = await fetch(`${API_URL}/decks/${id}`);
    return response.json()
}