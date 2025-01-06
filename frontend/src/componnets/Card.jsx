import React from 'react';
import { ChevronRight } from 'lucide-react';

const Card = ({ 
  id, 
  title, 
  content, 
  isSelected,
  shouldDim,
  autoResetTime,
  isAutoReset,
  onClick 
}) => {
  return (
    <div
      className={`
        relative 
        p-6 
        rounded-xl 
        bg-[#1e2538]/50
        backdrop-blur-sm
        border
        border-[#2a354d]
        transition-all 
        duration-300 
        cursor-pointer
        ${shouldDim ? 'opacity-50' : 'opacity-100'}
        ${isSelected ? 'shadow-lg shadow-blue-500/20' : ''}
      `}
      onClick={() => onClick(id)}
    >
      <div className="relative z-10">
        <h3 className="text-lg font-medium text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-300">
          {content}
        </p>
      </div>

      <div className="absolute right-4 bottom-4">
        <button 
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {isSelected && isAutoReset && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-blue-500/80 text-white text-xs rounded-full">
          Reset in {autoResetTime}s
        </div>
      )}
    </div>
  );
};

export default Card;