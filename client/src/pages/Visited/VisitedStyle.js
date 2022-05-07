import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  return {
    body: {
      display: "grid",
      gap: "1rem",
      justifyContent: "center",
      gridTemplate: "1fr / repeat(auto-fit, minmax(210px, 300px))",
    },
  };
});
