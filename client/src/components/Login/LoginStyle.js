import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const primaryColor = theme.colors[theme.primaryColor];
  return {
    title: {
      fontSize: "2em",
      fontWeight: "bold",
      marginBottom: "10px",
      color: primaryColor[6],
    },
    box: {
      margin: "auto",
      height: "calc(100vh - 6rem)",
      width: "100%",
      display: "grid",
      placeItems: "center",
    },
    burger: {
      [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
        display: "none",
      },
    },
    drawer: {
      padding: "1rem",
      [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
        display: "none",
      },
    },
    formWrapper: {
      width: "100%",
      maxWidth: "440px",
    },
  };
});
