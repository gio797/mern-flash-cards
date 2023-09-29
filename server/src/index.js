import express from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck.js";
import "dotenv/config";
import cors from "cors";
import { getDecksController } from "./controllers/getDecksController.js";
import { createDeckController } from "./controllers/createDeckController.js";
import { deleteDeckController } from "./controllers/deleteDeckController.js";
import { createCardForDeckController } from "./controllers/createCardForDeckController.js";

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/decks", getDecksController);

app.post("/decks/:id/cards", createCardForDeckController);

app.post("/decks", createDeckController);

app.delete("/decks/:id", deleteDeckController);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, console.log("listening"));
});
