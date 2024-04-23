import { Reducer, configureStore, Action } from "@reduxjs/toolkit";
import themeReducer, { IAction, ThemeState } from "../../store/reducer/theme";

type CustomReducer<
  S = any,
  A extends Action<string> = Action<string>
> = Reducer<S, A>;
type AppAction = IAction | Action;

export const store = configureStore({
  reducer: {
    theme: themeReducer as CustomReducer<ThemeState, AppAction>,
  },
});
