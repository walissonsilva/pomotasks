import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "../styles/GlobalStyles";
import darkTheme from "../styles/themes/dark";

import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <Component {...pageProps} />

      <ToastContainer autoClose={5000} />
    </ThemeProvider>
  );
}

export default MyApp;
