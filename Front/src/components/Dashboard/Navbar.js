import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserInfo } from '../../redux/orebiSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.orebiReducer.userInfo[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(removeUserInfo());
    navigate('/signin');
  };

  const handleRedirect = () => {
    setDropdownOpen(false);
    navigate('/profile');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className='bg-white text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center'>
      {userInfo ? (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className='flex-grow text-center'
        >
          <span className='text-lg font-semibold'>
            Bienvenido {userInfo.name} al panel de control de {userInfo.role}
          </span>
        </motion.div>
      ) : (
        <button 
          onClick={() => navigate('/signin')} 
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200'
        >
          Login
        </button>
      )}

      {userInfo && (
        <div className='relative flex items-center ml-4'>
          <button onClick={toggleDropdown} className='flex items-center'>
            <img src={userInfo.photo} alt="Profile" className='w-10 h-10 rounded-full border border-gray-300' />
            <span className='ml-2 font-medium text-gray-800'>{userInfo.name}</span>
          </button>

          {dropdownOpen && (
            <motion.div 
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }} 
              transition={{ duration: 0.3 }}
              className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10'
            >
              <button 
                onClick={handleRedirect} 
                className='block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left'
              >
                Regresar
              </button>
              <button 
                onClick={handleLogout} 
                className='block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left'
              >
                Cerrar Sesión
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
