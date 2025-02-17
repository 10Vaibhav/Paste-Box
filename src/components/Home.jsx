import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, UpdateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // it gives object of parameters.
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

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
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 rounded-2xl mt-2 w-[65%] pl-5"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
        onClick={createPaste}
        className="p-2 rounded-2xl mt-2">
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="mt-8">
        <textarea
        className="rounded-2xl mt-4 min-w-[500px] p-4"
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
