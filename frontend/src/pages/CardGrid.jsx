import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';

const CardGridConfig = () => {
  const [cardCount, setCardCount] = useState(4);
  const [columns, setColumns] = useState(2);
  const [selectedCard, setSelectedCard] = useState(null);
  const [autoResetTime, setAutoResetTime] = useState(3);
  const [resetTimer, setResetTimer] = useState(null);
  const [isAutoReset, setIsAutoReset] = useState(true);

  // 重置選中狀態
  const resetSelection = useCallback(() => {
    setSelectedCard(null);
  }, []);

  // 處理卡片選擇
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

  // 清理計時器
  useEffect(() => {
    return () => {
      if (resetTimer) {
        clearTimeout(resetTimer);
      }
    };
  }, [resetTimer]);

  // 獲取卡片的樣式類別
  const getCardClasses = (cardId) => {
    const baseClasses = "group relative overflow-hidden rounded-xl border border-white/20 transition-all duration-300";
    const activeClasses = selectedCard === cardId 
      ? "bg-white/15 backdrop-blur-md shadow-2xl scale-102 z-10" 
      : "bg-white/10 backdrop-blur-sm shadow-lg";
    const dimClasses = selectedCard && selectedCard !== cardId 
      ? "opacity-50" 
      : "opacity-100";
    
    return `${baseClasses} ${activeClasses} ${dimClasses}`;
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 配置控制面板 */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Cards:
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={cardCount}
              onChange={(e) => setCardCount(Math.min(12, Math.max(1, Number(e.target.value))))}
              className="w-20 px-2 py-1 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Columns:
            </label>
            <input
              type="number"
              min="1"
              max="4"
              value={columns}
              onChange={(e) => setColumns(Math.min(4, Math.max(1, Number(e.target.value))))}
              className="w-20 px-2 py-1 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoReset"
                checked={isAutoReset}
                onChange={(e) => setIsAutoReset(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label 
                htmlFor="autoReset" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Auto Reset
              </label>
            </div>
            {isAutoReset && (
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Reset Time (s):
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={autoResetTime}
                  onChange={(e) => setAutoResetTime(Math.min(10, Math.max(1, Number(e.target.value))))}
                  className="w-20 px-2 py-1 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 卡片網格 */}
      <div 
        className="grid gap-6"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
        }}
      >
        {Array.from({ length: cardCount }, (_, i) => ({
          id: i + 1,
          title: `Card ${i + 1}`,
          content: `Content for card ${i + 1}`
        })).map(card => (
          <div
            key={card.id}
            className={getCardClasses(card.id)}
            onClick={() => handleCardClick(card.id)}
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              cursor: 'pointer'
            }}
          >
            {/* 卡片主要內容區域 */}
            <div className="p-6">
              {/* 玻璃擬態效果背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* 卡片內容 */}
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {card.content}
                </p>
              </div>
            </div>

            {/* 斜切角按鈕區域 */}
            <div className="absolute bottom-0 right-0">
              {/* 斜切角背景 */}
              <div 
                className="absolute bottom-0 right-0 w-20 h-20 bg-blue-500/10"
                style={{
                  clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                }}
              />
              
              {/* 按鈕 */}
              <button 
                className="absolute bottom-4 right-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 group-hover:scale-110 transform-gpu pointer-events-none"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* 裝飾元素 */}
            <div 
              className={`absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-xl transition-opacity duration-300 ${
                selectedCard === card.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} 
            />
            
            {/* 選中指示器 */}
            {selectedCard === card.id && (
              <div className="absolute inset-0 border-2 border-blue-500/50 rounded-xl pointer-events-none">
                {isAutoReset && (
                  <div className="absolute top-2 right-2 bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">
                    Reset in {autoResetTime}s
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGridConfig;