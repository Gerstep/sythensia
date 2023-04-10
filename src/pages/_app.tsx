import type { AppProps } from "next/app";
import "public/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import TopMenu from "@/components/TopMenu";

function App({ Component, pageProps }: AppProps) {

  return (
    <>
    <ThirdwebProvider activeChain="ethereum">
      <TopMenu />
      <Component {...pageProps} />
    </ThirdwebProvider>
    </>
  );
}

export default App;