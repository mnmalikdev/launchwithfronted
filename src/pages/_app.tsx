import AuthContextProvider from "@/context/authentication.context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/customStyles.css";
import ProjectProvider from "../context/projectsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ProjectProvider>
        <Component {...pageProps} />
      </ProjectProvider>
    </AuthContextProvider>
  );
}
