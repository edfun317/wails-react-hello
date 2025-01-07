import React from 'react';
import { Pointer } from 'lucide-react';

/**
 * CardButton Component
 * A button component that appears in the bottom-right corner with a triangular background
 */
const CardButton = () => {
  // Define the size of the corner area (increased from original 20px)
  const cornerSize = {
    width: '80px',   // Originally 20px
    height: '80px'   // Originally 20px
  };

  // Adjust button position to match the larger corner area
  const buttonPosition = {
    bottom: '16px',  // Originally 4px
    right: '16px'    // Originally 4px
  };

  return (
    // Container for the entire button component
    <div className="absolute bottom-0 right-0">
      {/* Triangular background created using clip-path */}
      <div 
        className="absolute bottom-0 right-0 bg-blue-500/10"
        style={{
          width: '160px',          // Originally w-20 (80px)
          height: '160px',         // Originally h-20 (80px)
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' // Creates a triangle shape
        }}
      />
      
      {/* Interactive button element with hover effects */}
      <button 
        className="absolute p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 group-hover:scale-110 transform-gpu pointer-events-none"
        style={{
          bottom: '16px',
          right: '16px'
        }}
      >
        {/* Pointer icon from lucide-react library */}
        <Pointer size={24} /> 
      </button>
    </div>
  );
};

export default CardButton;