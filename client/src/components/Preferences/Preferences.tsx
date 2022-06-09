import {
  Button,
  ColorSwatch,
  Group,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useContext } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { PrimaryColorContext } from "../Theme";
import { useStyles } from "./PreferencesStyle";

function Preferences(): JSX.Element {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { colors, primaryColor } = useMantineTheme();

  const { setPrimaryColor } = useContext(PrimaryColorContext);
  return (
    <>
      <Text inherit className={classes.heading}>
        Pick your preferences:
      </Text>
      <Group position="center" spacing="xs" my="1rem">
        {Object.keys(colors).map((color) => (
          <ColorSwatch
            key={color}
            className={classes.color}
            color={colors[color][6]}
            onClick={() => {
              setPrimaryColor(() => color);
              localStorage.setItem("primaryColor", color);
            }}
          >
            {primaryColor === color && <AiOutlineCheck />}
          </ColorSwatch>
        ))}
      </Group>
      <Text py={"1rem"}>Background</Text>
      <Button onClick={() => toggleColorScheme()}>
        {colorScheme === "dark" ? "Light" : "Dark"}
      </Button>
    </>
  );
}

export default Preferences;
