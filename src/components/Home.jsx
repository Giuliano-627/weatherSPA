import React from "react";
import { useState } from "react";
import {useSelector} from "react-redux"
import {getData} from "../redux/actions"
export default function Home() {
  const [input, setInput] = useState("");
  const datos = useSelector(s=>s.datos);
  function handleChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }
  return (
    <div>
      <input type="text" onChange={(e) => handleChange(e)} />
      <button onClick={()=>getData(input)}>GET DATA CLG</button>
    </div>
  );
}
//cambio