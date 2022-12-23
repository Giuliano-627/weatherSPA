const initialState = {
  datos: {},
  posiblesCiudades:[],
  dataToRender:{},
  cityNSLL: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "DATA_WEATHER":
      return {
        ...state,
        datos: action.payload,
      };
    case "POSIBLE_CITIES":
      return {
        ...state,
        posiblesCiudades: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;