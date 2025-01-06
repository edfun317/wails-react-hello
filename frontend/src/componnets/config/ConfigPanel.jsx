import React from 'react';
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
  setAutoResetTime
}) => {
  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-wrap gap-4 items-center">
        <ConfigInput
          label="Cards"
          value={cardCount}
          onChange={(e) => setCardCount(Math.min(CONFIG_LIMITS.CARDS.MAX, Math.max(CONFIG_LIMITS.CARDS.MIN, Number(e.target.value))))}
          min={CONFIG_LIMITS.CARDS.MIN}
          max={CONFIG_LIMITS.CARDS.MAX}
        />
        <ConfigInput
          label="Columns"
          value={columns}
          onChange={(e) => setColumns(Math.min(CONFIG_LIMITS.COLUMNS.MAX, Math.max(CONFIG_LIMITS.COLUMNS.MIN, Number(e.target.value))))}
          min={CONFIG_LIMITS.COLUMNS.MIN}
          max={CONFIG_LIMITS.COLUMNS.MAX}
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
              Auto Reset
            </label>
          </div>
          {isAutoReset && (
            <ConfigInput
              label="Reset Time (s)"
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