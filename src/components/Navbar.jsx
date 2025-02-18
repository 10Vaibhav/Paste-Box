import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-950 shadow-lg p-4 mb-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">PasteBox</div>
        <div className="flex gap-6">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `text-lg ${isActive ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-300 transition-colors`
            }
          >
            Home
          </NavLink>

          <NavLink 
            to="/pastes"
            className={({isActive}) => 
              `text-lg ${isActive ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-300 transition-colors`
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
