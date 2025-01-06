import React from 'react';
import { ChevronRight } from 'lucide-react';

const CardButton = () => {
  return (
    <div className="absolute bottom-0 right-0">
      <div 
        className="absolute bottom-0 right-0 w-20 h-20 bg-blue-500/10"
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
        }}
      />
      <button 
        className="absolute bottom-4 right-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 group-hover:scale-110 transform-gpu pointer-events-none"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default CardButton;