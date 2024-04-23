import { Link } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../store/action/changeTheme.tsx";
import { ThemeState } from "../../store/reducer/theme";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@mui/material";
import { lightTheme, darkTheme } from "../../store/reducer/theme";

const Header = () => {
  const { control } = useForm();

  const theme = useSelector((state: { theme: ThemeState }) => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? darkTheme : lightTheme;
    dispatch(changeTheme(newTheme));
    console.log("theme changed");
  };

  return (
    <header>
      <nav className="header">
        <div
          className="link"
          style={{
            fontSize: "23px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/dataManagement">Management </Link>
        </div>

        <div
          className="theme-switch"
          style={{
            marginLeft: "800px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="theme-switch"
            style={{ marginRight: "20px", whiteSpace: "nowrap" }}
          >
            Theme Color
          </label>
          <Controller
            control={control}
            name="theme"
            defaultValue={theme === lightTheme}
            render={({ field }) => (
              <Switch
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  toggleTheme(e.target.checked);
                }}
              />
            )}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
