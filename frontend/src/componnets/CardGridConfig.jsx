import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { DEFAULT_VALUES, CONFIG_LIMITS } from '../constants/cardConfig';
import { useCardSelection } from '../hooks/useCardSelection';
import ConfigPanel from './config/ConfigPanel';
import Card from './card/Card';

const CardGridConfig = ({
  containerWidth = '100%',
  containerHeight = '100%'
}) => {
  const [cardCount, setCardCount] = useState(DEFAULT_VALUES.CARD_COUNT);
  const [columns, setColumns] = useState(DEFAULT_VALUES.COLUMNS);
  const [isAutoReset, setIsAutoReset] = useState(true);
  const [autoResetTime, setAutoResetTime] = useState(DEFAULT_VALUES.AUTO_RESET_TIME);
  const [cardWidth, setCardWidth] = useState(CONFIG_LIMITS.CARD_SIZE.DEFAULT_WIDTH);
  const [cardHeight, setCardHeight] = useState(CONFIG_LIMITS.CARD_SIZE.DEFAULT_HEIGHT);
  
  // 新增控制面板顯示狀態
  const [showConfigPanel, setShowConfigPanel] = useState(true);

  const { selectedCard, handleCardClick } = useCardSelection(isAutoReset, autoResetTime);

  const cards = Array.from({ length: cardCount }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
    content: `Content for card ${i + 1}`
  }));

  return (
    <div 
      className="bg-gray-100 dark:bg-gray-900"
      style={{ 
        width: containerWidth,
        height: containerHeight,
        overflow: 'auto'
      }}
    >
      {/* 控制面板切換按鈕 */}
      <button
        className="w-full flex items-center justify-center py-2 bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
        onClick={() => setShowConfigPanel(!showConfigPanel)}
      >
        {showConfigPanel ? (
          <>
            <ChevronUp size={20} />
            <span className="ml-2 text-gray-700 dark:text-gray-200">Hide Configuration</span>
          </>
        ) : (
          <>
            <ChevronDown size={20} />
            <span className="ml-2 text-gray-700 dark:text-gray-200">Show Configuration</span>
          </>
        )}
      </button>

      {/* 控制面板 */}
      {showConfigPanel && (
        <div className="p-6">
          <ConfigPanel
            cardCount={cardCount}
            setCardCount={setCardCount}
            columns={columns}
            setColumns={setColumns}
            isAutoReset={isAutoReset}
            autoResetTime={autoResetTime}
            setAutoResetTime={setAutoResetTime}
            cardWidth={cardWidth}
            setCardWidth={setCardWidth}
            cardHeight={cardHeight}
            setCardHeight={setCardHeight}
          />
        </div>
      )}

      {/* 卡片網格容器 */}
      <div 
        className="grid gap-6 overflow-x-auto p-6"
        style={{
          gridTemplateColumns: `repeat(${columns}, ${cardWidth}px)`,
          justifyContent: columns === 1 ? 'center' : 'start'
        }}
      >
        {cards.map(card => (
          <Card
            key={card.id}
            {...card}
            selectedCard={selectedCard}
            onClick={handleCardClick}
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