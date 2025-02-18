import React, { useState } from "react";
import { addFlashcard } from "../api";

const FlashcardForm = ({ fetchFlashcards }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addFlashcard({ question, answer, box: 1 });
    setQuestion("");
    setAnswer("");
    fetchFlashcards();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold mb-2">Add Flashcard</h3>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Add Flashcard
      </button>
    </form>
  );
};

export default FlashcardForm;


