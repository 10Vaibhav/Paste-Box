import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes);
    console.log(pastes);
    const dispatch = useDispatch();

    

    return (
        <div>
            Paste
        </div>
    )
}

export default Paste;
