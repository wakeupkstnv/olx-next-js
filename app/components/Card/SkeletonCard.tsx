import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg animate-pulse">
      <div className="w-16 h-16 mb-2 rounded-full bg-gray-200"></div>
      <div className="w-3/4 h-4 bg-gray-200 mt-2 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
