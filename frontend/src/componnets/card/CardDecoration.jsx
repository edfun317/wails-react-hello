import React from 'react';

const CardDecoration = ({ isSelected, isAutoReset, autoResetTime }) => {
  return (
    <>
      <div 
        className={`absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-xl transition-opacity duration-300 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`} 
      />
      
      {isSelected && (
        <div className="absolute inset-0 border-2 border-blue-500/50 rounded-xl pointer-events-none">
          {isAutoReset && (
            <div className="absolute top-2 right-2 bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">
              列印中等待 {autoResetTime} 秒
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CardDecoration;