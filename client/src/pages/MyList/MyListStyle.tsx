import { createStyles, MantineTheme } from "@mantine/core";

export const useStyles = createStyles((theme: MantineTheme) => {
  const primaryColor = theme.colors[theme.primaryColor];
  return {
    body: {
      display: "grid",
      gap: "1rem",
      justifyContent: "center",
      gridTemplate: "1fr / repeat(auto-fit, minmax(210px, 300px))",
    },
    notFoundWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "calc(100vh - 6rem)",
      transform: "translateY(-15%)",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: "1.5em",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "10px",
      color: primaryColor[9],
    },
  };
});
