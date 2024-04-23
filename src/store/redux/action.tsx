export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

interface ToggleDarkModeAction {
  type: typeof TOGGLE_DARK_MODE;
}

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});

export type ThemeActionTypes = ToggleDarkModeAction;
