import React, { useState } from 'react';
import { DEFAULT_VALUES, CONFIG_LIMITS } from '../constants/cardConfig';
import { useCardSelection } from '../hooks/useCardSelection';
import ConfigPanel from './config/ConfigPanel';
import Card from './card/Card';

const CardGridConfig = () => {
  const [cardCount, setCardCount] = useState(DEFAULT_VALUES.CARD_COUNT);
  const [columns, setColumns] = useState(DEFAULT_VALUES.COLUMNS);
  const [isAutoReset, setIsAutoReset] = useState(true);
  const [autoResetTime, setAutoResetTime] = useState(DEFAULT_VALUES.AUTO_RESET_TIME);
  
  // 添加寬高狀態
  const [cardWidth, setCardWidth] = useState(CONFIG_LIMITS.CARD_SIZE.DEFAULT_WIDTH);
  const [cardHeight, setCardHeight] = useState(CONFIG_LIMITS.CARD_SIZE.DEFAULT_HEIGHT);

  const { selectedCard, handleCardClick } = useCardSelection(isAutoReset, autoResetTime);

  const cards = Array.from({ length: cardCount }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
    content: `Content for card ${i + 1}`
  }));

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <ConfigPanel
        cardCount={cardCount}
        setCardCount={setCardCount}
        columns={columns}
        setColumns={setColumns}
        isAutoReset={isAutoReset}
        setIsAutoReset={setIsAutoReset}
        autoResetTime={autoResetTime}
        setAutoResetTime={setAutoResetTime}
        cardWidth={cardWidth}
        setCardWidth={setCardWidth}
        cardHeight={cardHeight}
        setCardHeight={setCardHeight}
      />

      <div 
        className="grid gap-6"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
        }}
      >
        {cards.map(card => (
          <Card
            key={card.id}
            {...card}
            selectedCard={selectedCard}
            onClick={handleCardClick}
            isAutoReset={isAutoReset}
            autoResetTime={autoResetTime}
            width={cardWidth}
            height={cardHeight}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGridConfig;