import React from 'react';

interface Category {
  name: string;
  icon: string;
  bgColor: string;
}

interface PartCardProps {
  index: number;
  category: Category;
}

const PartCard: React.FC<PartCardProps> = ({ index, category }) => {
  return (
    <div key={index} className="flex flex-col items-center p-4 bg-white shadow rounded-lg">
      <div className={`w-16 h-16 mb-2 rounded-full flex items-center justify-center ${category.bgColor}`}>
        <img
          src={category.icon}
          alt={category.name}
          className="object-contain w-10 h-10"
        />
      </div>
      <div className="text-center font-medium">{category.name}</div>
    </div>
  );
};

export default PartCard;
