import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { createContext, useState } from "react";
import { theme as gloablTheme } from "../theme/index";

export const ThemeContext = createContext(gloablTheme);

function Theme({ children }) {
  const [theme, setTheme] = useState({
    primaryColor: localStorage.getItem("primaryColor") || "blue",
    colorScheme: localStorage.getItem("colorScheme") || "light",
  });

  return (
    <MantineProvider
      theme={{
        ...gloablTheme,
        primaryColor: theme.primaryColor,
        colorScheme: theme.colorScheme,
      }}
      withGlobalStyles
      inherit
    >
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ModalsProvider>
          <NotificationsProvider position="top-center" />
          {children}
        </ModalsProvider>
      </ThemeContext.Provider>
    </MantineProvider>
  );
}

export default Theme;
