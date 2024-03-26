import React, { useCallback, useEffect } from "react";
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
  DeleteNote: (id: number) => void;
  ToggleFavorite: (id: number) => void;
  FilterCards: (type: NoteTypesEnum) => void;
}

export const NotesContext = React.createContext<CardContext>({
  AddOrUpdateNote: () => {},
  DeleteNote: () => {},
  ToggleFavorite: () => {},
  FilterCards: () => {},
});

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [filteredCardData, setFilteredCardData] = useState<CardData[]>([]);
  const [currentCardType, setCurrentCardType] = useState<NoteTypesEnum>(
    NoteTypesEnum.ninguna
  );

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

  const toggleFavorite = (id: number) => {
    const cardToFavourite = cardData.find((card) => card.id === id);
    if (cardToFavourite) {
      cardToFavourite.isFavorite = !cardToFavourite.isFavorite;
      setCardData([...cardData]);
    }
  };

  const filterCards = useCallback(
    (type: NoteTypesEnum) => {
      var filteredCards: CardData[];

      switch (type) {
        case NoteTypesEnum.ninguna:
          filteredCards = [...cardData];
          break;
        case NoteTypesEnum.favoritas:
          filteredCards = cardData.filter((card) => card.isFavorite === true);
          break;
        default:
          filteredCards = cardData.filter((card) => card.category === type);
          break;
      }
      setCurrentCardType(type);
      setFilteredCardData(filteredCards);
    },
    [cardData]
  );

  useEffect(() => {
    filterCards(currentCardType);
  }, [cardData, currentCardType, filterCards]);

  return (
    <NotesContext.Provider
      value={{
        AddOrUpdateNote: addOrUpdateNote,
        DeleteNote: deleteNote,
        ToggleFavorite: toggleFavorite,
        FilterCards: filterCards,
        CardData: filteredCardData,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesProvider = () => useContext(NotesContext);
