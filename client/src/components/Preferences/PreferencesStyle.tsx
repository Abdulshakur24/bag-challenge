import { createStyles, MantineTheme } from "@mantine/core";

export const useStyles = createStyles((theme: MantineTheme) => {
  const primaryColor = theme.colors[theme.primaryColor][5];

  return {
    heading: {
      fontWeight: 700,
      color: primaryColor,
    },
    color: {
      cursor: "pointer",
    },
  };
});
