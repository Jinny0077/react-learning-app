import { CHANGE_THEME } from "../action/changeTheme";
import { Reducer } from "@reduxjs/toolkit";

export interface IAction {
  type: typeof CHANGE_THEME;
  payload: string;
}
export interface Theme {
  backgroundColor: string;
  textColor: string;
}

export interface ThemeState {
  backgroundColor: string;
  textColor: string;
}

export const lightTheme = {
  backgroundColor: "white",
  textColor: "black",
};

export const darkTheme = {
  backgroundColor: "black",
  textColor: "white",
};

const initialState: ThemeState = {
  backgroundColor: "white",
  textColor: "black",
};

type ChangeThemeAction = {
  type: typeof CHANGE_THEME;
  payload: Theme; // Payload should be of type Theme
};

// export const THEME_LIGHT = "light";
// export const THEME_DARK = "dark";

const themeReducer: Reducer<ThemeState, ChangeThemeAction> = (
  state = initialState,
  action: ChangeThemeAction
) => {
  console.log("Reducer Action:", action);
  switch (action.type) {
    case CHANGE_THEME:
      const newTheme = action.payload === lightTheme ? darkTheme : lightTheme;
      console.log("New Theme:", action.payload);
      return {
        ...state,
        theme: newTheme,
        // styles: themeStyles,
      };
    default:
      return state;
  }
};

export default themeReducer;
