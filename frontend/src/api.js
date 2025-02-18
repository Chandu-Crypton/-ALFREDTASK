import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getFlashcards = () => API.get("/flashcards");
export const addFlashcard = (flashcard) => API.post("/flashcards", flashcard);
export const updateFlashcard = (id, data) => API.put(`/flashcards/${id}`, data);
export const deleteFlashcard = (id) => API.delete(`/flashcards/${id}`);