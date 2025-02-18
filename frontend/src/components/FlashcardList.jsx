import React, { useEffect, useState } from "react";
import { getFlashcards } from "../api";
import Flashcard from "./Flashcard";

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const { data } = await getFlashcards();
    setFlashcards(data);
  };

 
  const groupedFlashcards = [1, 2, 3].map((box) =>
    flashcards.filter((card) => card.box === box)
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Flashcards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groupedFlashcards.map((group, index) => (
          <div key={index}>
            <h3 className="font-semibold">Box {index + 1}</h3>
            <div className="grid grid-cols-1 gap-4">
              {group.map((card) => (
                <Flashcard
                  key={card._id}
                  card={card}
                  fetchFlashcards={fetchFlashcards}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardList;


