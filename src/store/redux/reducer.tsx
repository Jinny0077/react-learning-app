import { TOGGLE_DARK_MODE, ThemeActionTypes } from "./action";

const initialState = {
  isDarkMode: false,
};

const themeReducer = (state = initialState, action: ThemeActionTypes) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    default:
      return state;
  }
};

export default themeReducer;
