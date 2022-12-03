import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import type { AppProps } from "next/app";
import AuthLayout from "../components/LayOut/AuthLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";
import { SkeletonTheme } from "react-loading-skeleton";
import NextNProgress from "nextjs-progressbar";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SkeletonTheme
        baseColor="rgb(224, 186, 186)"
        highlightColor="rgba(0,0,0,0.2)"
      >
        <AuthLayout>
          <NextNProgress
            showOnShallow={true}
            options={{
              showSpinner: false,
            }}
          />
          <SWRConfig
            value={{
              revalidateOnFocus: false,
              shouldRetryOnError: false,
            }}
          >
            {" "}
            <Component {...pageProps} />
          </SWRConfig>
          <ToastContainer />
        </AuthLayout>
      </SkeletonTheme>
    </>
  );
}
