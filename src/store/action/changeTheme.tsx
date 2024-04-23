interface Theme {
  backgroundColor: string;
  textColor: string;
}

export const CHANGE_THEME = "CHANGE_THEME";

export const changeTheme = (theme: Theme) => ({
  type: CHANGE_THEME,
  payload: theme,
});
