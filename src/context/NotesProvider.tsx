import React from "react";
import { useContext, useState } from "react";
import { NoteTypesEnum } from "../types";

export interface CardData {
  id: number;
  title: string;
  description: string;
  category: NoteTypesEnum;
  date: Date;
  isFavorite: boolean;
}

interface CardContext {
  CardData?: CardData[];
  AddOrUpdateNote: (data: CardData) => void;
  DeleteNote: (id: Number) => void;
}

export const NotesContext = React.createContext<CardContext>({
  AddOrUpdateNote: () => {},
  DeleteNote: () => {},
});

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [cardData, setCardData] = useState<CardData[]>([]);

  const addOrUpdateNote = (data: CardData) => {
    if (data.id !== 0) {
      const cardToUpdate = cardData.find((card) => card.id === data.id);
      if (cardToUpdate) {
        setCardData(
          cardData.map((card) => (card.id === data.id ? data : card))
        );
      }
    } else {
      data.id = cardData.length
        ? Math.max(...cardData.map((card) => card.id)) + 1
        : 1;
      setCardData([...cardData, { ...data }]);
    }
  };

  const deleteNote = (id: Number) => {
    const cardToDelete = cardData.find((card) => card.id === id);
    if (cardToDelete) {
      setCardData(cardData.filter((card) => card.id !== id));
    }
  };

  const toggleFavorite = (id: Number) => {
    const cardToFavourite = cardData.find((card) => card.id === id);
    if (cardToFavourite) {
      cardToFavourite.isFavorite = !cardToFavourite.isFavorite;
      setCardData([...cardData, { ...cardToFavourite }]);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        AddOrUpdateNote: addOrUpdateNote,
        DeleteNote: deleteNote,
        CardData: cardData,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesProvider = () => useContext(NotesContext);
