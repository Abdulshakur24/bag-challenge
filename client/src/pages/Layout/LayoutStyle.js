import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  return {
    container: {
      maxWidth: 1400,
      padding: "1rem",
      minHeight: "100vh",
    },
    box: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "fixed",
      inset: "0 0 auto 0",
      maxWidth: theme.breakpoints.xl,
      margin: "0 auto",
      backgroundColor: theme.colorScheme === "dark" ? "#1A1B1E" : "white",
      padding: "1rem",
      zIndex: 150,
      transition: "150ms ease-in-out",
      "&.hidden": {
        transform: `translateY(-100%)`,
      },
    },
    burger: {
      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        display: "none",
      },
    },
    desktopInfo: {
      display: "none",
      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      },
    },
    avatar: {
      cursor: "pointer",
    },
    modal: {
      // maxHeight: "600px",
    },
    drawer: {
      padding: "1rem",
      overflowY: "auto",
      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        display: "none",
      },
    },
    outlet: {
      paddingTop: "4rem",
    },
  };
});
