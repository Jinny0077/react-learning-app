import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",

  defaultRadius: "md", //lg, sm, md ,xs

  primaryColor: "primary",

  spacing: {
    xs: "8px",
    md: "10px",
    sm: "10px",
    lg: "15px",
    xl: "20px",
  },

  primaryShade: { light: 6, dark: 7 }, //6 is default

  // default is blue, but can customize it, or customize other color other color
  colors: {
    blue: [
      "#7AD1DD",
      "#5FCCDB",
      "#44CADC",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
    ],
    "bright-pink": [
      "#F0BBDD",
      "#ED9BCF",
      "#EC7CC3",
      "#ED5DB8",
      "#F13EAF",
      "#F71FA7",
      "#FF00A1",
      "#E00890",
      "#C50E82",
      "#AD1374",
    ],
    primary: [
      "#847FC3",
      "#847FC3",
      "#847FC3",
      "#847FC3",
      "#847FC3",
      "#847FC3",
      "#847FC3",
      "#847FC3",
      "#847FC3",
      "#847FC3",
    ],
    secondary: [
      "#adaacb",
      "#adaacb",
      "#adaacb",
      "#adaacb",
      "#adaacb",
      "#adaacb",
      "#adaacb",
      "#adaacb",
      "#adaacb",
      "#adaacb",
    ],
  },
});

export default function AppTheme(props: any) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {props.children}
    </MantineProvider>
  );
}
