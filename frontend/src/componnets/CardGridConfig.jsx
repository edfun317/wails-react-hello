import React, { useState, useEffect } from 'react';
import WailsAPI from '../services/wailsApi';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { DEFAULT_VALUES, CONFIG_LIMITS } from '../constants/cardConfig';
import { useCardSelection } from '../hooks/useCardSelection';
import ConfigPanel from './config/ConfigPanel';
import Card from './card/Card';
import CardIdSettings from './config/CardIdSettings';

const CardGridConfig = ({
  containerWidth = '100%',
  containerHeight = '100%'
}) => {
  // 原有的 state
  const [cardCount, setCardCount] = useState(DEFAULT_VALUES.CARD_COUNT);
  const [columns, setColumns] = useState(DEFAULT_VALUES.COLUMNS);
  const [isAutoReset, setIsAutoReset] = useState(true);
  const [autoResetTime, setAutoResetTime] = useState(DEFAULT_VALUES.AUTO_RESET_TIME);
  const [cardWidth, setCardWidth] = useState(CONFIG_LIMITS.CARD_SIZE.DEFAULT_WIDTH);
  const [cardHeight, setCardHeight] = useState(CONFIG_LIMITS.CARD_SIZE.DEFAULT_HEIGHT);
  
  // 控制面板顯示狀態
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  // 卡片 ID 設定模態框狀態
  const [showCardIdSettings, setShowCardIdSettings] = useState(false);
  // 卡片數據
  const [cards, setCards] = useState(
    Array.from({ length: cardCount }, (_, i) => ({
      id: i + 1,
      customId: `Card ${i + 1}`,
      title: `Card ${i + 1}`,
      content: `Content for card ${i + 1}`
    }))
  );

  const { selectedCard, handleCardClick } = useCardSelection(isAutoReset, autoResetTime);

  useEffect(() => {
    // Setup event listeners
    const cleanupFns = [
        WailsAPI.addEventListener(
            WailsAPI.Events.TOGGLE_CONFIG,
            () => setShowConfigPanel(prev => !prev)
        ),
        WailsAPI.addEventListener(
            WailsAPI.Events.OPEN_CARD_SETTINGS,
            () => setShowCardIdSettings(true)
        )
    ];

    // Cleanup all listeners on unmount
    return () => cleanupFns.forEach(cleanup => cleanup());
  }, []);

  // 更新卡片數量時重新生成卡片
  useEffect(() => {
    setCards(Array.from({ length: cardCount }, (_, i) => ({
      id: i + 1,
      customId: cards[i]?.customId || `Card ${i + 1}`,
      title: `Card ${i + 1}`,
      content: `Content for card ${i + 1}`
    })));
  }, [cardCount]);

  return (
    <div 
      className="bg-gray-100 dark:bg-gray-900"
      style={{ 
        width: containerWidth,
        height: containerHeight,
        overflow: 'auto'
      }}
    >
      {/* 配置面板 */}
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

      {/* 卡片網格 */}
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

      {/* 卡片 ID 設定模態框 */}
      {showCardIdSettings && (
        <CardIdSettings
          cards={cards}
          setCards={setCards}
          onClose={() => setShowCardIdSettings(false)}
        />
      )}
    </div>
  );
};

export default CardGridConfig;