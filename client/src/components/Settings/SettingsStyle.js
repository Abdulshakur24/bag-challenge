import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const primaryColor = theme.colors[theme.primaryColor][7];
  const secondaryColor = theme.colors[theme.primaryColor][5];

  return {
    settingsWrapper: {},
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1rem",
      position: "relative",
      height: "45px",
    },
    popover: {
      height: "20px",
      position: "absolute",
      bottom: "0",
      borderRadius: "4px",
      cursor: "pointer",
    },
    drawer: {
      padding: "1rem",
      [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
        display: "none",
      },
    },
    body: {
      display: "flex",
      flexDirection: "column",
    },
    anchor: {
      display: "flex",
      padding: "0.25rem 0.75rem",
      borderRadius: "4px",
      backgroundColor: primaryColor,
      color: "white",
      ":hover": {
        textDecoration: "none",
        backgroundColor: secondaryColor,
      },
    },
    signout: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  };
});
