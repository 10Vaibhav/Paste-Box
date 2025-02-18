import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, UpdateToPastes } from "../redux/pasteSlice";
import { useSelector } from "react-redux";


const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // it gives object of parameters.
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);


  useEffect(()=> {

    if(pasteId){
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }

  }, [pasteId])

  function createPaste(){
    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if(!title.trim() || !value.trim()) {
      alert('Please fill both title and content');
      return;
    }

    if(pasteId) {
      dispatch(UpdateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    // Reset form
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-row gap-4 items-center">
        <input
          className="flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          className="w-full rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all p-4"
          value={value}
          placeholder="Enter Content Here..."
          onChange={(e)=> setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
