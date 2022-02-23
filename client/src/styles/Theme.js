import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global";
import themes from "./typography";

const Theme = ({ children }) => (
  <ThemeProvider theme={themes}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export default Theme;
