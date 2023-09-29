import { API_URL } from "./config";

export type DeckType = {
    title: string;
    _id: string;
  };

export async function getDecks ():Promise<DeckType[]> {
    const response = await fetch(`${API_URL}/decks`);
    return response.json()
}