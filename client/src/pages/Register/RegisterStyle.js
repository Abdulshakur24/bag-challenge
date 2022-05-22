import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const primaryColor = theme.colors[theme.primaryColor];

  return {
    title: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
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
      //   margin: "1rem 0",
    },
    input: {
      marginBottom: "1rem",
    },
    text: {
      fontSize: "2em",
      fontWeight: "bold",
      marginBottom: "10px",
      color: primaryColor[6],
    },
    profileFile: {
      display: "none",
    },
    label: {
      position: "absolute",
      right: "0",
      width: "56px",
      height: "56px",
      opacity: "0",
      zIndex: "20",

      ":hover": {
        cursor: "pointer",
      },
    },
  };
});
