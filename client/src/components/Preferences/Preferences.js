import {
  Button,
  ColorSwatch,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { AiOutlineCheck } from "react-icons/ai";
import { useContext } from "react";
import { ThemeContext } from "../Theme";
import { useStyles } from "./PreferencesStyle";

function Preferences() {
  const { classes } = useStyles();
  const themes = useMantineTheme();
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <Text className={classes.heading}>Pick your preferences:</Text>
      <Group position="center" spacing="xs" my="1rem">
        {Object.keys(themes.colors).map((color) => {
          return (
            <ColorSwatch
              key={color}
              className={classes.color}
              color={themes.colors[color][6]}
              disabled={theme.primaryColor === theme.colorScheme}
              onClick={() => {
                setTheme({ ...theme, primaryColor: color });
                localStorage.setItem("primaryColor", color);
              }}
            >
              {themes.primaryColor === color && <AiOutlineCheck />}
            </ColorSwatch>
          );
        })}
      </Group>
      <Text py={"1rem"}>Background</Text>
      <Button
        onClick={() => {
          const updateColorScheme =
            theme.colorScheme === "light" ? "dark" : "light";
          setTheme({
            ...theme,
            colorScheme: updateColorScheme,
          });
          localStorage.setItem("colorScheme", updateColorScheme);
        }}
      >
        {theme.colorScheme === "dark" ? "Light" : "Dark"}
      </Button>
    </>
  );
}

export default Preferences;
