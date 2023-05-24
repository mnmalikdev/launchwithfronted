import AuthContextProvider from "@/context/authentication.context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/customStyles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
