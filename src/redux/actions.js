import axios from "axios"; //La api key esta activada
function dailyToDaily(day) {
  if (day === 1) {
    return "Lunes";
  }
  if (day === 2) {
    return "Martes";
  }
  if (day === 3) {
    return "Miercoles";
  }
  if (day === 4) {
    return "Jueves";
  }
  if (day === 5) {
    return "Viernes";
  }
  if (day === 6) {
    return "Sabado";
  }
  if (day === 7) {
    return "Domingo";
  }
}
function unixToHMS(unix) {
  let fecha = new Date(unix * 1000);
  let dia = fecha.getDay();
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  return {
    diaNumeral:dia,
    dia: dailyToDaily(dia),
    horas,
    minutos,
  };
}
function calcDirViento(direccion) {
  if (direccion === 0) {
    return "Este";
  }
  if (direccion === 90) {
    return "Norte";
  }
  if (direccion === 180) {
    return "Oeste";
  }
  if (direccion === 270) {
    return "Sur";
  }
  if (direccion > 0 && direccion < 90) {
    return "Noreste";
  }
  if (direccion > 90 && direccion < 180) {
    return "Noroeste";
  }
  if (direccion > 180 && direccion < 270) {
    return "Sudoeste";
  }
  if (direccion > 270 && direccion < 360) {
    return "Sudeste";
  }
}
function getState(CDNLLURL, estado) {
  for (let i = 0; i < CDNLLURL.data.length; i++) {
    if(estado.toLowerCase() === CDNLLURL.data[i].state.toLowerCase()){
      console.log(`CDNLL: ${CDNLLURL.data[i].state}`);
      return CDNLLURL.data[i]
    }
  }
}
export async function getData(city, state) {
  let cityNLLURL = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=50&appid=b9a02a6249bee675f1eb5806664034d0`
  );
  cityNLLURL
    ? console.log("Data city name long y lat OK")
    : console.log("cityNLL NOT OK");
  let cityNLLDATA = getState(cityNLLURL, state);

  let cityWeatherData = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${cityNLLDATA.lat}&lon=${cityNLLDATA.lon}&exclude=hourly&appid=b9a02a6249bee675f1eb5806664034d0`
  );
  const actualDay = unixToHMS(cityWeatherData.data.current.dt).diaNumeral
  const cityTime = unixToHMS(cityWeatherData.data.current.dt);
  const amanecer =
    unixToHMS(cityWeatherData.data.current.sunrise).horas +
    ":" +
    unixToHMS(cityWeatherData.data.current.sunrise).minutos;
  const anochecer =
    unixToHMS(cityWeatherData.data.current.sunset).horas +
    ":" +
    unixToHMS(cityWeatherData.data.current.sunset).minutos;
  const presion = cityWeatherData.data.current.pressure; //en milibares
  const humedad = cityWeatherData.data.current.humidity; //ej: 88, es el porcentaje
  const temp = cityWeatherData.data.current.temp - 273.15; // pasado de kelvin a celsius
  const sensacion = cityWeatherData.data.current.feels_like - 273.15;
  const velViento = cityWeatherData.data.current.wind_speed + "km/h"; //km/h
  const dirViento = calcDirViento(cityWeatherData.data.current.wind_deg);
  const puntoRocio = cityWeatherData.data.current.dew_point - 273.15;
  const tempMin = cityWeatherData.data.daily[actualDay].temp.min - 273.15;
  const tempMax = cityWeatherData.data.daily[actualDay].temp.max - 273.15;
  const precipitaciones = [];
  for (let i = 0; i < cityWeatherData.data.minutely.length; i++) {
    precipitaciones.push({
      tiempo: unixToHMS(cityWeatherData.data.minutely[i].dt).minutos,
      precipitacion: cityWeatherData.data.minutely[i].precipitation,
    });
  }
  const datos = {
    cityTime,
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
  };
  console.log(`Data: ${JSON.stringify(datos)}`);
  return { type: "DATA_WEATHER", datos };
}
