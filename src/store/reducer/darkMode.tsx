import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import "./darkMode.css";

import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/action";
import { RootState } from "../redux/rootReducer";
import { useEffect } from "react";

const DarkMode = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <div>
          {isDarkMode ? (
            <DarkModeTwoToneIcon style={{ marginLeft: "5px" }} />
          ) : (
            <WbSunnyTwoToneIcon style={{ marginLeft: "35px" }} />
          )}
        </div>
      </label>
    </div>
  );
};

export default DarkMode;
