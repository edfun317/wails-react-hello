import React, { useState } from 'react';
import ConfigInput from './ConfigInput';
import { CONFIG_LIMITS } from '../../constants/cardConfig';

const ConfigPanel = ({
  cardCount,
  setCardCount,
  columns,
  setColumns,
  isAutoReset,
  setIsAutoReset,
  autoResetTime,
  setAutoResetTime,
  cardWidth,
  setCardWidth,
  cardHeight,
  setCardHeight
}) => {
  // 新增臨時輸入狀態
  const [tempWidth, setTempWidth] = useState(cardWidth);
  const [tempHeight, setTempHeight] = useState(cardHeight);

  // 處理寬度變更
  const handleWidthChange = (e) => {
    const value = e.target.value;
    setTempWidth(value);
    
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      if (numValue >= CONFIG_LIMITS.CARD_SIZE.MIN && numValue <= CONFIG_LIMITS.CARD_SIZE.MAX) {
        setCardWidth(numValue);
      }
    }
  };

  // 處理高度變更
  const handleHeightChange = (e) => {
    const value = e.target.value;
    setTempHeight(value);
    
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      if (numValue >= CONFIG_LIMITS.CARD_SIZE.MIN && numValue <= CONFIG_LIMITS.CARD_SIZE.MAX) {
        setCardHeight(numValue);
      }
    }
  };

  // 處理失去焦點時的驗證
  const handleWidthBlur = () => {
    const numValue = parseInt(tempWidth);
    if (isNaN(numValue) || numValue < CONFIG_LIMITS.CARD_SIZE.MIN) {
      setTempWidth(CONFIG_LIMITS.CARD_SIZE.MIN);
      setCardWidth(CONFIG_LIMITS.CARD_SIZE.MIN);
    } else if (numValue > CONFIG_LIMITS.CARD_SIZE.MAX) {
      setTempWidth(CONFIG_LIMITS.CARD_SIZE.MAX);
      setCardWidth(CONFIG_LIMITS.CARD_SIZE.MAX);
    }
  };

  const handleHeightBlur = () => {
    const numValue = parseInt(tempHeight);
    if (isNaN(numValue) || numValue < CONFIG_LIMITS.CARD_SIZE.MIN) {
      setTempHeight(CONFIG_LIMITS.CARD_SIZE.MIN);
      setCardHeight(CONFIG_LIMITS.CARD_SIZE.MIN);
    } else if (numValue > CONFIG_LIMITS.CARD_SIZE.MAX) {
      setTempHeight(CONFIG_LIMITS.CARD_SIZE.MAX);
      setCardHeight(CONFIG_LIMITS.CARD_SIZE.MAX);
    }
  };

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-wrap gap-4 items-center">
        <ConfigInput
          label="卡片總數"
          value={cardCount}
          onChange={(e) => setCardCount(Math.min(CONFIG_LIMITS.CARDS.MAX, Math.max(CONFIG_LIMITS.CARDS.MIN, Number(e.target.value))))}
          min={CONFIG_LIMITS.CARDS.MIN}
          max={CONFIG_LIMITS.CARDS.MAX}
        />
        <ConfigInput
          label="一橫排數量"
          value={columns}
          onChange={(e) => setColumns(Math.min(CONFIG_LIMITS.COLUMNS.MAX, Math.max(CONFIG_LIMITS.COLUMNS.MIN, Number(e.target.value))))}
          min={CONFIG_LIMITS.COLUMNS.MIN}
          max={CONFIG_LIMITS.COLUMNS.MAX}
        />
        <ConfigInput
          label="單個卡片寬度"
          value={tempWidth}
          onChange={handleWidthChange}
          onBlur={handleWidthBlur}
        />
        <ConfigInput
          label="單個卡片高度"
          value={tempHeight}
          onChange={handleHeightChange}
          onBlur={handleHeightBlur}
        />
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
              開啟點選效果 
            </label>
          </div>
          {isAutoReset && (
            <ConfigInput
              label="點選效果秒數"
              value={autoResetTime}
              onChange={(e) => setAutoResetTime(Math.min(CONFIG_LIMITS.RESET_TIME.MAX, Math.max(CONFIG_LIMITS.RESET_TIME.MIN, Number(e.target.value))))}
              min={CONFIG_LIMITS.RESET_TIME.MIN}
              max={CONFIG_LIMITS.RESET_TIME.MAX}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;