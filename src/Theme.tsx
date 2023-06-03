import { ThemeProvider, css } from "styled-components";

export const theme = {
  colors: {
    secondary: "#E7C147",
    primary: "#14238A",
    background: "#FEFDF1",
    background2: "#eae8d8",
  },
  fontSize: {
    s: "0.75rem",
    medium: "1rem",
    medium1: "1.15rem",
    large: "1.25rem",
    xl: "1.5rem",
    h1: "2.5rem",
    h2: "2rem",
    h3: "1.75rem",
  },
  fontThemes: {
    h1: css`
      font-size: 2.5rem;
      font-weight: bold;
      letter-spacing: 7px;
      color: #14238a;
    `,
    h2: css`
      font-size: 2rem;
      font-weight: bold;
      color: #14238a;
    `,
    h3: css`
      font-size: 1.75rem;
      font-weight: bold;
      color: #e7c147;
      text-shadow: 0px 0px 1px lightgray;
    `,
    h4: css`
      font-size: 1.5rem;
      font-weight: bold;
      color: #e7c147;
      text-shadow: 0px 0px 1px lightgray;
    `,
    h5: css`
      font-size: 1.25rem;
      font-weight: bold;
      color: #e7c147;
      text-shadow: 0px 0px 1px lightgray;
    `,
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
