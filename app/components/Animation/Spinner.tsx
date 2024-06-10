import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-80 md:py-64">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 md:h-36 md:w-36"></div>
    </div>
  );
};

export default Spinner;
