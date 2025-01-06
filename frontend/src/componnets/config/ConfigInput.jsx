import React from 'react';

const ConfigInput = ({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  type = "number",
  className = "" 
}) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}:
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-20 px-2 py-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${className}`}
      />
    </div>
  );
};

export default ConfigInput;