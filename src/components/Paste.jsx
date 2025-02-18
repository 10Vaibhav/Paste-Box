import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeFromPastes} from '../redux/pasteSlice'
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){

    dispatch(removeFromPastes(pasteId));

  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <input
        className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid gap-6 mt-8">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div 
                className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-6 hover:shadow-lg transition-shadow" 
                key={paste?._id}
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-100">{paste.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{paste.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <NavLink 
                      to={`/?pasteId=${paste?._id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </NavLink>
                    <NavLink 
                      to={`/pastes/${paste?._id}`}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      View
                    </NavLink>
                    <button 
                      onClick={() => handleDelete(paste?._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to Clipboard");
                      }}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <time className="text-sm text-gray-400">{new Date(paste.createdAt).toLocaleDateString()}</time>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
