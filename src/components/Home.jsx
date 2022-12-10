import React from "react";
import { useState } from "react";
//import {useSelector} from "react-redux"
import {getData} from "../redux/actions"
export default function Home() {
  const [inputCity, setInputCity] = useState("");
  const [inputState, setInputState] = useState("");
  //const datos = useSelector(s=>s.datos);
  function handleChangeCity(e) {
    e.preventDefault();
    setInputCity(e.target.value);
  }
  function handleChangeState(e) {
    e.preventDefault();
    setInputState(e.target.value);
  }
  return (
    <div>
      <h4>Ciudad</h4><input type="text" onChange={(e) => handleChangeCity(e)} />
      <h4>Estado-Provincia</h4><input type="text" onChange={(e) => handleChangeState(e)} />
      <button onClick={()=>getData(inputCity,inputState)}>GET DATA CLG</button>
    </div>
  );
}
//cambio