import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, PaletteMode } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
    },
  });
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <CssBaseline />
      <Button
        onClick={() => {
          if (mode === "dark") {
            setMode("light");
          } else {
            setMode("dark");
          }
        }}
      >
        Switch Theme
      </Button>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
