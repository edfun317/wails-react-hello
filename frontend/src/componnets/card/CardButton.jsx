import React from 'react';
//import { ChevronRight } from 'lucide-react';
import { Hand } from 'lucide-react';


const CardButton = () => {
  // 增加斜角區域的尺寸
  const cornerSize = {
    width: '80px',  // 原本是 20px
    height: '80px'  // 原本是 20px
  };

  // 調整按鈕位置以配合更大的斜角區域
  const buttonPosition = {
    bottom: '16px',  // 原本是 4px
    right: '16px'    // 原本是 4px
  };

  return (
    <div className="absolute bottom-0 right-0">
      {/* 斜角背景 */}
      <div 
        className="absolute bottom-0 right-0 bg-blue-500/10"
        style={{
          width: '160px',          // 原本是 w-20 (80px)
          height: '160px',         // 原本是 h-20 (80px)
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
        }}
      />
      
      {/* 按鈕 */}
      <button 
        className="absolute p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 group-hover:scale-110 transform-gpu pointer-events-none"
        style={{
          bottom: '16px',
          right: '16px'
        }}
      >
        <Hand size={24} /> {/* 使用 PointRight 或 Hand 圖標 */}
      </button>
    </div>
  );
};

export default CardButton;