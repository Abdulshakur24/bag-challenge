import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const primaryColor = theme.colors[theme.primaryColor];

  const hexToRgb = (hex) =>
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16));

  const rgb = hexToRgb(primaryColor[8]);

  const rgba = (aplha) => `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]} / ${aplha}%)`;

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
    detailsWrapper: {},
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
      fontWeight: "600",
      transition: "all 150ms ease-in-out",
      backgroundColor: primaryColor[8],
      boxShadow: `0 1px 3px ${rgba(15)}, ${rgba(15)} 0px 28px 23px -7px, ${rgba(
        14
      )} 0px 12px 12px -7px`,
    },
  };
});
