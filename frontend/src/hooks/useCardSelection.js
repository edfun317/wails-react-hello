import { useState, useCallback, useEffect } from 'react';

export const useCardSelection = (isAutoReset, autoResetTime) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [resetTimer, setResetTimer] = useState(null);

  const resetSelection = useCallback(() => {
    setSelectedCard(null);
  }, []);

  const handleCardClick = (cardId) => {
    if (resetTimer) {
      clearTimeout(resetTimer);
    }

    setSelectedCard(selectedCard === cardId ? null : cardId);

    if (isAutoReset && cardId !== selectedCard) {
      const timer = setTimeout(resetSelection, autoResetTime * 1000);
      setResetTimer(timer);
    }
  };

  useEffect(() => {
    return () => {
      if (resetTimer) {
        clearTimeout(resetTimer);
      }
    };
  }, [resetTimer]);

  return {
    selectedCard,
    handleCardClick,
    resetSelection
  };
};