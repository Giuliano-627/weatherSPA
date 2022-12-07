const initialState = {
  datos: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "DATA_WEATHER":
      return {
        ...state,
        datos: action.payload,
      };
  }
}

export default rootReducer;
