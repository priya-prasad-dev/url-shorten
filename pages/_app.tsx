import Layout from "@/components/layout/layout";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
