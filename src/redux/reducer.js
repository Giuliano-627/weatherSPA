const initialState = {
  datos: {},
  posiblesCiudades:[],
  cityNSLL: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "DATA_WEATHER":
      console.log("Entrando en data_weather");
      return {
        ...state,
        datos: action.payload,
      };
    case "POSIBLE_CITIES":
      console.log("Entrando en POSIBLES CIUDADES");
      return {
        ...state,
        posiblesCiudades: action.payload,
      };
    default:
      console.log("DEFAULT SWITCH REDUCER");
      return {
        ...state,
      };
  }
}

export default rootReducer;
