"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { FaCloudUploadAlt } from 'react-icons/fa';

const uploadImages = async (images: FileList) => {
  const imageUrls: string[] = [];
  for (let i = 0; i < images.length; i++) {
    const formData = new FormData();
    formData.append('file', images[i]);
    const response = await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    imageUrls.push(response.data.location); 
  }
  return imageUrls;
};

const ImageUploadPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const mutation = useMutation(uploadImages, {
    onSuccess: (data) => {
      setImageUrls(data);
      alert('Images uploaded successfully!');
      queryClient.invalidateQueries('product'); // Invalidate queries to refetch product data
    },
    onError: (error) => {
      console.error('Error uploading images:', error);
      alert('Error uploading images.');
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
      console.log('Selected images:', e.target.files);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images) {
      mutation.mutate(images);
    } else {
      alert('Please select images');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20 flex items-center justify-center">
      <main className="container mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#002F34] mb-8 text-center">Загрузка товара</h1>
        <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Ваше имя:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Название продукта</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Описание</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Цена</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Изображения</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <FaCloudUploadAlt className="w-12 h-12 text-gray-500" />
                  <p className="pt-1 text-sm tracking-wider text-gray-500">Выберите изображения</p>
                </div>
                <input
                  type="file"
                  multiple
                  className="opacity-0"
                  onChange={handleImageChange}
                  required
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#002F34] text-white py-2 px-4 rounded-lg hover:bg-[#004f64]"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Uploading...' : 'Upload Images'}
          </button>
        </form>
        {imageUrls.length > 0 && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-bold mb-2">Uploaded Images URLs:</h2>
            {imageUrls.map((url, index) => (
              <div key={index} className="mb-2">
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {url}
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ImageUploadPage;
