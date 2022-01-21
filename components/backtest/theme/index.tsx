import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";
import { DeepPartial } from "utility-types";

type MyTheme = {
  custom: {
    text: {
      dark: string;
      dark2: string;
      blue: string;
    };
  };
};

type MyThemeOptions = DeepPartial<MyTheme>;
declare module "@mui/material/styles" {
  interface Theme extends MyTheme {}
  interface ThemeOptions extends MyThemeOptions {}
}

const theme = createTheme({
  custom: {
    text: {
      dark: "#333743",
      dark2: "#777",
      blue: "#5c8dde",
    },
  },
  typography: {
    fontFamily: "Robot,Noto Sans TC,Noto Sans SC,Noto Sans JP, sans-serif",
  },
  palette: {
    primary: {
      main: "#ffc001",
    },
  },
});

export function BackTestThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
