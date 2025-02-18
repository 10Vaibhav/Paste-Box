import React from "react";
import { useSelector } from "react-redux";
import { useParams} from "react-router-dom";


const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
        <input
          className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100"
          type="text"
          value={paste.title}
          disabled
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
        <textarea
          className="w-full rounded-lg border border-gray-700 bg-gray-800 text-gray-100 p-4"
          value={paste.content}
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
