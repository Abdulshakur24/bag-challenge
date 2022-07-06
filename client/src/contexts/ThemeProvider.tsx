import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { createContext, useContext, useState } from "react";
import { ThemeProps } from "src/types/defaults";
import { theme as globalTheme } from "../theme/index";

const ThemeContext = createContext({} as ThemeProps);

export const usePrimaryColor = () => useContext(ThemeContext);

function ThemeProvider({ children }) {
  const [colorScheme, setColorScheme] = useState(
    (localStorage.getItem("colorScheme") as ColorScheme | undefined) || "light"
  );

  const [primaryColor, setPrimaryColor] = useState(
    (localStorage.getItem("primaryColor") as string | undefined) || "lime"
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const determine = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(value || determine);
    localStorage.setItem("colorScheme", determine);
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <ThemeContext.Provider value={{ setPrimaryColor }}>
        <MantineProvider
          theme={{
            ...globalTheme,
            colorScheme,
            primaryColor,
          }}
          withGlobalStyles
          inherit
        >
          <ModalsProvider>
            <NotificationsProvider position="top-center" />
            {children}
          </ModalsProvider>
        </MantineProvider>
      </ThemeContext.Provider>
    </ColorSchemeProvider>
  );
}

export default ThemeProvider;
