"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { FaCloudUploadAlt } from 'react-icons/fa';

const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append('file', image);
  console.log('Uploading image:', image);
  const response = await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log('Upload response:', response);
  return response.data.location; // Adjust according to the actual response structure
};

const ImageUploadPage = () => {
  const [name, setName] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const mutation = useMutation(uploadImage, {
    onSuccess: (data) => {
      console.log('Image uploaded successfully:', data);
      setImageUrl(data);
      alert('Image uploaded successfully!');
    },
    onError: (error) => {
      console.error('Error uploading image:', error);
      alert('Error uploading image.');
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log('Selected image:', e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      mutation.mutate(image);
    } else {
      alert('Please select an image');
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Изображение</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <FaCloudUploadAlt className="w-12 h-12 text-gray-500" />
                  <p className="pt-1 text-sm tracking-wider text-gray-500">Select an image</p>
                </div>
                <input
                  type="file"
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
            {mutation.isLoading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
        {imageUrl && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-bold mb-2">Uploaded Image URL:</h2>
            <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {imageUrl}
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default ImageUploadPage;
