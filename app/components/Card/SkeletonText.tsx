import React from 'react';

const SkeletonText: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-4 animate-pulse py-11">
      <div className="w-3/4 h-8 bg-gray-200 mb-4 rounded"></div>
    </div>
  );
};

export default SkeletonText;
