import React from 'react';
import CardContent from './CardContent';
import CardButton from './CardButton';
import CardDecoration from './CardDecoration';
import { getCardClasses } from '../../utils/styleUtils';

const Card = ({ 
  id, 
  title, 
  content, 
  selectedCard, 
  onClick, 
  isAutoReset, 
  autoResetTime,
  width,
  height,
  disableButton=false
}) => {
  return (
    <div
      className={getCardClasses(id, selectedCard)}
      onClick={() => onClick(id)}
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        cursor: 'pointer',
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <CardContent title={title} content={content} />

      {!disableButton && (
        <CardButton />
      )} 
      <CardDecoration 
        isSelected={selectedCard === id}
        isAutoReset={isAutoReset}
        autoResetTime={autoResetTime}
      />
    </div>
  );
};

export default Card;