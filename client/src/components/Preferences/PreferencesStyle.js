import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const primaryColor = theme.colors[theme.primaryColor][5];

  return {
    heading: {
      fontWeight: "700",
      color: primaryColor,
    },
    color: {
      cursor: "pointer",
    },
  };
});
