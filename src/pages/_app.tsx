import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "../styles/GlobalStyles";
import darkTheme from "../styles/themes/dark";

import "react-toastify/dist/ReactToastify.css";
import AppCard from "../components/AppCard";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />

      <AppCard>
        <Component {...pageProps} />
      </AppCard>

      <ToastContainer autoClose={5000} />
    </ThemeProvider>
  );
}

export default MyApp;
