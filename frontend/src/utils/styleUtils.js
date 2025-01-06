export const getCardClasses = (cardId, selectedCard) => {
  const baseClasses = "group relative overflow-hidden rounded-xl border border-white/20 transition-all duration-300";
  const activeClasses = selectedCard === cardId 
    ? "bg-white/15 backdrop-blur-md shadow-2xl scale-102 z-10" 
    : "bg-white/10 backdrop-blur-sm shadow-lg";
  const dimClasses = selectedCard && selectedCard !== cardId 
    ? "opacity-50" 
    : "opacity-100";
  
  return `${baseClasses} ${activeClasses} ${dimClasses}`;
};