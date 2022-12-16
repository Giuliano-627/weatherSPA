import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCity, getData } from "../redux/actions";
export default function Home() {
  const dispatch = useDispatch();
  const [inputCity, setInputCity] = useState("");
  const possibleCities = useSelector((s) => s.posiblesCiudades);
  function handleChangeCity(e) {
    e.preventDefault();
    setInputCity(e.target.value);
  }
  /*function handleChangeState(e) {
    e.preventDefault();
    setInputState(e.target.value);
  }*/
  function handleSelectChange(e) {
    e.preventDefault();
    dispatch(getData(possibleCities, e.target.value));
    e.target.value="disabled";
  }
  return (
    <div>
      <h4>Ciudad</h4>
      <input type="text" onChange={(e) => handleChangeCity(e)} />
      <button onClick={() => dispatch(getCity(inputCity))}>GET DATA CLG</button>
      {possibleCities.length ? (
        <div>
          <h2>Posibles ciudades:</h2>
          <select onChange={(e) => handleSelectChange(e)}>
            <option hidden>Seleccione un estado/provincia</option>
            {possibleCities.map((e) => (
              <option value={e.state}>
                {e.state}, {e.country}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
  );
}
//cambio
