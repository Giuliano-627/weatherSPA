import React from "react";

export default function Card({
  hora,
  amanecer,
  anochecer,
  presion,
  humedad,
  temp,
  sensacion,
  velViento,
  dirViento,
  puntoRocio,
  tempMin,
  tempMax,
  precipitaciones,
}) {
  let prom = 0;
  prom += precipitaciones.map((e) => e.precipitacion);
  prom = prom / precipitaciones.length;
  return (
    <div>
      <h2>
        Hora: {hora}:{precipitaciones[0].tiempo}
      </h2>
      <h2>Amanecer: {amanecer}</h2>
      <h2>Anochecer: {anochecer}</h2>
      <h2>Presion: {presion} mBar</h2>
      <h2>Humedad: {humedad}%</h2>
      <h2>Minima: {tempMin}°</h2>
      <h2>Temperatura: {temp}°</h2>
      <h2>Maxima: {tempMax}°</h2>
      <h2>Sensacion termica: {sensacion}°</h2>
      <h2>Velocidad del viento: {velViento} km/h</h2>
      <h2>Direccion del viento: {dirViento}</h2>
      <h2>Punto de rocio: {puntoRocio}°</h2>
      <ul>
        <h2>Precipitaciones en los sig 60 min</h2>
        {prom === 0 ? (
          precipitaciones?.map((e) => (
            <li>
              {e.tiempo < precipitaciones[0].tiempo ? (
                <h4>
                  Horas {Number(hora) + 1} Minuto {e.tiempo}: {e.precipitacion}
                  mm
                </h4>
              ) : (
                <h4>
                  Horas {hora} Minuto {e.tiempo}: {e.precipitacion}mm
                </h4>
              )}
            </li>
          ))
        ) : (
          <h4>Sin precipitaciones</h4>
        )}
      </ul>
    </div>
  );
}
