import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { getDecksController } from "./controllers/getDecksController.js";
import { createDeckController } from "./controllers/createDeckController.js";
import { deleteDeckController } from "./controllers/deleteDeckController.js";
import { createCardForDeckController } from "./controllers/createCardForDeckController.js";
import { getDeckController } from "./controllers/getDeckController.js";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController.js";

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:id", deleteDeckController);
app.get("/decks/:id", getDeckController);
app.post("/decks/:id/cards", createCardForDeckController);
app.delete("/decks/:id/cards/:index", deleteCardOnDeckController);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, console.log("listening"));
});
