import axios from "axios"; //La api key esta activada
function reduceZeros(numero){
  let number = numero.toFixed(3).toString()
  return Number(number);
}
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
  let minutos;
  if (fecha.getMinutes().toString().length === 1) {
    minutos = "0" + fecha.getMinutes();
  } else {
    minutos = fecha.getMinutes();
  }
  return {
    diaNumeral: dia,
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
  console.log(
    `Entrando a getState con datos de ${JSON.stringify(
      CDNLLURL
    )} estado: ${estado}`
  );
  for (let i = 0; i < CDNLLURL.length; i++) {
    if (estado.toLowerCase() === CDNLLURL[i].state.toLowerCase()) {
      console.log(`CDNLL: ${CDNLLURL[i].state}`);
      return CDNLLURL[i];
    } else {
    }
  }
}
export function getCity(city) {
  return async (dispatch) => {
    try {
      let cityNLLURL = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=50&appid=b9a02a6249bee675f1eb5806664034d0`
      );
      if (cityNLLURL) {
        console.log("Data city name long y lat OK");
        return dispatch({
          type: "POSIBLE_CITIES",
          payload: cityNLLURL.data,
        });
      } else {
        console.log("cityNLL NOT OK");
      }
    } catch (error) {
      console.log("ERROR EN GET CITY:", error);
    }
  };
}

export function getData(posCity, state) {
  console.log(
    `Entrando a getData con datos de ${JSON.stringify(
      posCity
    )}, estado ${state}`
  );
  return async (dispatch) => {
    try {
      let cityNLLDATA = getState(posCity, state);

      let cityWeatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${cityNLLDATA.lat}&lon=${cityNLLDATA.lon}&exclude=hourly&appid=b9a02a6249bee675f1eb5806664034d0`
      );
      console.log("City weather data:", cityWeatherData.data);
      const actualDay = unixToHMS(cityWeatherData.data.current.dt).diaNumeral;
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
      const temp = reduceZeros(cityWeatherData.data.current.temp - 273.15); // pasado de kelvin a celsius
      const sensacion = reduceZeros(cityWeatherData.data.current.feels_like - 273.15);
      const velViento = reduceZeros(cityWeatherData.data.current.wind_speed * 3.6) + "km/h"; // m/s sin conversion
      const dirViento = calcDirViento(cityWeatherData.data.current.wind_deg);
      const puntoRocio = reduceZeros(cityWeatherData.data.current.dew_point - 273.15);
      const tempMin = reduceZeros(cityWeatherData.data.daily[actualDay].temp.min - 273.15);
      const tempMax = reduceZeros(cityWeatherData.data.daily[actualDay].temp.max - 273.15);
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
      return dispatch({ type: "DATA_WEATHER", payload: datos });
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };
}
