import React, { Fragment } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCity, getData } from "../redux/actions";
import Card from "./Cards";
export default function Home() {
  const dispatch = useDispatch();
  const [inputCity, setInputCity] = useState("");
  const possibleCities = useSelector((s) => s.posiblesCiudades);
  const data = useSelector(s=>s.datos)
  data.precipitaciones.slice(-1);
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
    e.target.value="hid";
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
            <option hidden value="hid">Seleccione un estado/provincia</option>
            {possibleCities.map((e) => (
              <option value={e.state}>
                {e.state}, {e.country}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      {data?(<Fragment>
        <Card
        hora={Number(data.cityTime.horas)}
        precipitaciones={data.precipitaciones.slice(0,-1)}
        amanecer={data.amanecer}
        anochecer={data.anochecer}
        presion={data.presion}
        humedad={data.humedad}
        temp={data.temp}
        sensacion={data.sensacion}
        velViento={data.velViento}
        dirViento={data.dirViento}
        puntoRocio={data.puntoRocio}
        tempMin={data.tempMin}
        tempMax={data.tempMax}
        />
      </Fragment>):null}
    </div>
  );
}
//cambio
