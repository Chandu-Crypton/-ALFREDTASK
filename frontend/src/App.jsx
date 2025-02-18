import React from "react";
import FlashcardList from "./components/FlashcardList";
import FlashcardForm from "./components/FlashcardForm";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Flashcard Learning App</h1>
      <div className="max-w-4xl mx-auto">
        <FlashcardForm fetchFlashcards={() => {}} />
        <FlashcardList />
      </div>
    </div>
  );
};

export default App;

