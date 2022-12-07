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
export function getData(city) {
  console.log("entrando a getData con la ciudad: ", city);
  return async (dispatch) => {
    let cityNLLURL = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=b9a02a6249bee675f1eb5806664034d0`
    );
    let cityNLLDATA = {
      name: cityNLLURL.data[0].name,
      latitude: cityNLLURL.data[0].lat,
      longitude: cityNLLURL.data[0].lon,
      country: cityNLLURL.data[0].country,
    };
    let cityWeatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cityNLLDATA.latitude}&lon=${cityNLLDATA.longitude}&exclude=hourly,daily&appid=b9a02a6249bee675f1eb5806664034d0`
    );
    const cityTime = unixToHMS(cityWeatherData.data.current.dt);
    const amanecer = unixToHMS(cityWeatherData.data.current.sunrise);
    const anochecer = unixToHMS(cityWeatherData.data.current.dt.sunset);
    const presion = cityWeatherData.data.current.pressure; //en milibares
    const humedad = cityWeatherData.data.current.humidity; //ej: 88, es el porcentaje
    const temp = cityWeatherData.data.current.temp - 273.15; // pasado de kelvin a celsius
    const sensacion = cityWeatherData.data.current.feels_like - 273.15;
    const velViento = cityWeatherData.data.current.wind_speed; //km/h
    const dirViento = calcDirViento(cityWeatherData.data.current.wind_deg);
    const puntoRocio = cityWeatherData.data.current.dew_point;
    const tempMin = cityWeatherData.data.daily.temp[0].min;
    const tempMax = cityWeatherData.data.daily.temp[0].max;
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
    return dispatch({ type: "DATA_WEATHER", datos });
  };
}
