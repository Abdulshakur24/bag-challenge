import {
  ColorScheme,
  ColorSchemeProvider,
  DefaultMantineColor,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { DeepPartial } from "@reduxjs/toolkit";
import { createContext, useState } from "react";
import { theme as globalTheme } from "../theme/index";

interface PrimaryColorInterface {
  setPrimaryColor: Function;
}

export const PrimaryColorContext = createContext<PrimaryColorInterface | null>(
  null
);

function Theme({ children }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    (localStorage.getItem("colorScheme") as ColorScheme) || "light"
  );

  const [primaryColor, setPrimaryColor] = useState<
    DeepPartial<DefaultMantineColor>
  >((localStorage.getItem("primaryColor") as string | undefined) || "lime");

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
      <PrimaryColorContext.Provider value={{ setPrimaryColor }}>
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
      </PrimaryColorContext.Provider>
    </ColorSchemeProvider>
  );
}

export default Theme;
