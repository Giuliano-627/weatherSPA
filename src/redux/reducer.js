const initialState = {
  datos: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "DATA_WEATHER":
      console.log("Entrando en data_weather")
      return {
        ...state,
        datos: action.payload,
      };
    default:
      console.log("DEFAULT SWITCH REDUCER");
      return{
        ...state
      }
  }
}

export default rootReducer;
