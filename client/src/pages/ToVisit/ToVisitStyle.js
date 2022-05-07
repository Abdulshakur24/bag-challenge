import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const primaryColor = theme.colors[theme.primaryColor];
  return {
    header: {
      margin: "0 0 2rem 0",
      display: "grid",
      gridTemplate: "1fr 1fr / 1fr 1fr 1fr",
      gap: "1.5rem",
    },
    body: {
      display: "grid",
      gap: "1rem",
      position: "relative",
      justifyContent: "center",
      gridTemplate: "1fr / repeat(auto-fit, minmax(210px, 300px))",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "1rem 0",
    },
    listBtn: {},
    input: {
      gridArea: "1 / 1 / span 1 / span 4",
      [`@media screen and (min-width: ${theme.breakpoints.sm}px)`]: {
        maxWidth: "400px",
      },
    },
    sortButton: {
      gridArea: "2 / 1 / span 1 / span 2",
      maxWidth: "200px",
    },
    menu: {
      gridArea: "2 / 3 / span 1 / span 2",
      justifySelf: "flex-end",
      width: "100%",
      maxWidth: "200px",
      [`@media screen and (min-width: ${theme.breakpoints.sm}px)`]: {
        gridArea: "1 / 3 / span 1 / span 2",
      },
    },
    SearchNotFoundWrapper: {
      position: "absolute",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    YouHaveVisitedAllCountryInThisRegionWrapper: {
      position: "absolute",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    scrollToTop: {
      position: "fixed",
      width: "40px",
      height: "40px",
      bottom: "1rem",
      zIndex: 100,
      background: primaryColor[8],
      borderRadius: "100%",
      cursor: "pointer",
      padding: "0.25rem",
    },
    icon: {
      color: "white",
    },
  };
});
