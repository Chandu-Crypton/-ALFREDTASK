import React, { useState } from "react";
import { updateFlashcard, deleteFlashcard } from "../api";


const reviewIntervals = [1, 3, 7]; 

const Flashcard = ({ card, fetchFlashcards }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedQuestion, setUpdatedQuestion] = useState(card.question);
  const [updatedAnswer, setUpdatedAnswer] = useState(card.answer);

  const updateReviewDate = (box) => {
    const today = new Date();
    const nextReviewDate = new Date(today);
    nextReviewDate.setDate(today.getDate() + reviewIntervals[box - 1]);
    return nextReviewDate;
  };

  const handleCorrect = async () => {
    const newBox = Math.min(card.box + 1, 3); 
    const newReviewDate = updateReviewDate(newBox);

    
    await updateFlashcard(card._id, { correct: true, box: newBox, nextReviewDate: newReviewDate });
    fetchFlashcards();
  };

  const handleWrong = async () => {
    const newBox = Math.max(card.box - 1, 1); // Min box is 1
    const newReviewDate = updateReviewDate(newBox);

   
    await updateFlashcard(card._id, { correct: false, box: newBox, nextReviewDate: newReviewDate });
    fetchFlashcards();
  };

  const handleDelete = async () => {
    await deleteFlashcard(card._id);
    fetchFlashcards();
  };

  const handleUpdate = async () => {
    
    await updateFlashcard(card._id, {
      question: updatedQuestion,
      answer: updatedAnswer,
    });
    setIsEditing(false);
    fetchFlashcards();
  };

  return (
    <div className="border p-4 rounded shadow-md bg-white">
      {isEditing ? (
        <div>
          <input
            type="text"
            className="border p-2 w-full mb-2"
            value={updatedQuestion}
            onChange={(e) => setUpdatedQuestion(e.target.value)}
          />
          <textarea
            className="border p-2 w-full mb-2"
            value={updatedAnswer}
            onChange={(e) => setUpdatedAnswer(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            onClick={handleUpdate}
          >
            Update Flashcard
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold">{card.question}</h3>
          {showAnswer && <p className="text-gray-700 mt-2">{card.answer}</p>}
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
        </div>
      )}

      <div className="mt-2 space-x-2">
        <button className="bg-green-500 text-white px-3 py-1" onClick={handleCorrect}>
          Got it Right
        </button>
        <button className="bg-red-500 text-white px-3 py-1" onClick={handleWrong}>
          Got it Wrong
        </button>
        <button className="bg-gray-500 text-white px-3 py-1" onClick={handleDelete}>
          Delete
        </button>
        {!isEditing && (
          <button
            className="bg-yellow-500 text-white px-3 py-1"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
