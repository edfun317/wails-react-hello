import React from 'react';

const CardContent = ({ title, content }) => {
  return (
    <div className="p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {content}
        </p>
      </div>
    </div>
  );
};

export default CardContent;