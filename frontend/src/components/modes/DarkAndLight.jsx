// src/components/SwitchButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../utils/darkmodeSlice';

const SwitchButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className="flex items-center ">
      <span className='text-white ml-6 font-mono text-xl'>Dark Mode</span>
      <span className="mr-2 text-sm">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
      <label className="relative inline-flex items-center cursor-pointer -ml-20">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => dispatch(toggleDarkMode())}
          className="sr-only peer"
        />
        <div
          className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4  
          dark:peer-focus:ring-white dark:bg-gray-700 peer-checked:after:translate-x-full 
          peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
          after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
          after:h-5 after:w-5 after:transition-all peer-checked:bg-black border-2 border-slate-500"
        ></div>
      </label>
    </div>
  );
};

export default SwitchButton;
