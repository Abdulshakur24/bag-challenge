import { createStyles, MantineTheme } from "@mantine/core";

export const useStyles = createStyles((theme: MantineTheme) => {
  const primaryColor = theme.colors[theme.primaryColor];

  const rgba = (alpha: number): string => theme.fn.rgba(primaryColor[8], alpha);

  return {
    container: {
      display: "grid",
      position: "relative",
      gap: "2.5rem",
      alignContent: "center",
      gridTemplate: "auto 1fr / 1fr",
      [`@media screen and (min-width: ${theme.breakpoints.md}px)`]: {
        gridTemplate: "1fr / 1fr 1fr",
      },
    },
    title: {
      color: primaryColor[4],
    },
    filterWrapper: {
      display: "flex",
      gap: "1rem",
      margin: "0 0 1rem 0",
      justifyContent: "space-between",
    },
    imageWrapper: {
      display: "grid",
      placeItems: "center",
    },
    image: {
      width: "clamp(220px, 100%, 471px)",
    },
    details: {},
    display: {
      display: "flex",
      gap: "1rem",
      alignContent: "center",
      justifyContent: "space-between",
    },
    borders: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: "1.5rem",
      alignItems: "center",
      gap: "1.5rem",
      justifyContent: "center",
    },
    border: {
      borderRadius: "4px",
      padding: "0.75rem",
      color: "white",
      fontWeight: 600,
      transition: "all 150ms ease-in-out",
      backgroundColor: primaryColor[8],
      boxShadow: `0 1px 3px ${rgba(0.15)}, ${rgba(
        0.15
      )} 0px 28px 23px -7px, ${rgba(0.14)} 0px 12px 12px -7px`,
    },
  };
});
