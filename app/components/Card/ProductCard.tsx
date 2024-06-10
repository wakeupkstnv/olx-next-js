import React from 'react';

interface Product {
  id: number;
  image: string;
  description: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
      <img
        src={product.image}
        alt={product.title}
        className="w-32 h-32 object-contain mb-4 rounded-full border border-gray-200"
      />
      <h2 className="text-lg font-semibold mb-2 text-center">{product.title}</h2>
      <p className="text-xl font-bold text-green-600 mb-2">${product.price}</p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">{product.rating.rate} ★</span>
        <span className="text-sm text-gray-600 ml-2">({product.rating.count} reviews)</span>
      </div>
    </div>
  );
};

export default ProductCard;
