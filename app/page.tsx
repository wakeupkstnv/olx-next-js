"use client"

import React from 'react';
import PartCard from './components/Card/PartCard';
import ProductCard from './components/Card/ProductCard';
import SkeletonCard from './components/Card/SkeletonCard';
import SkeletonText from './components/Card/SkeletonText';
import categories from './constant';
import { useQuery } from 'react-query';
import { axiosInstance } from './connect';

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

interface Category {
  name: string;
  icon: string;
  bgColor: string;
}

async function getProduct(): Promise<Product[]> {
  const response = await axiosInstance.get("/products");
  return response.data;
}

export default function Home() {
  const { data, isLoading, isError } = useQuery<Product[], Error>('product', getProduct);
  console.log(data);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-14">
        <main className="container mx-auto px-4 py-6">
          <div className="text-center">
            <SkeletonText />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center mt-20">Error loading data.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <main className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-5xl font-extrabold text-[#002F34]">Разделы на сервисе OLX</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category: Category, index: number) => (
            <PartCard key={index} index={index} category={category} />
          ))}
        </div>
        <div className="text-center mt-16">
          <h1 className="text-2xl md:text-5xl font-extrabold text-[#002F34]">Топ продаж</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
          {data?.map((product: Product, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
