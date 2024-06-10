import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#002F34] text-white py-2 px-4 sm:px-6 border-b border-gray-300 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="w-12 h-12 sm:w-16 sm:h-16 py-1 flex items-center">
              <img 
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/OLX_green_logo.svg/1200px-OLX_green_logo.svg.png' 
                className="invert transition-transform duration-300 transform hover:scale-110" 
                alt="Logo"
              />
            </div>
          </Link> 
        </div>
        <nav className="flex items-center gap-2 sm:gap-4 text-sm sm:text-lg px-2 sm:px-8">
          <div className='flex flex-nowrap items-center'> 
            <Link href="#">
              <div  
                className="flex items-center bg-[#002F34] text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md font-bold hover:bg-olxYellow ml-2 sm:ml-4 hover:underline" 
              > 
                <FontAwesomeIcon icon={faHeart} className="w-4 h-4 sm:w-6 sm:h-6 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Избранное</span>
                <span className="inline sm:hidden">Избр.</span>
              </div> 
            </Link>
            <Link href="#">
              <div  
                className="flex items-center bg-[#002F34] text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md font-bold hover:bg-olxYellow ml-2 sm:ml-4 hover:underline" 
              > 
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 sm:w-6 sm:h-6 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Ваш профиль</span>
                <span className="inline sm:hidden">Профиль</span>
              </div> 
            </Link>
            <Link href="/create">
              <div  
                className="bg-white text-[#002F34] px-2 py-1 sm:px-4 sm:py-2 rounded-md font-bold hover:bg-olxYellow ml-2 sm:ml-4 hover:underline" 
              > 
                <span className="hidden sm:inline">Подать объявление</span>
                <span className="inline sm:hidden">Объяв.</span>
              </div> 
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
