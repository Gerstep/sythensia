import { type ReactNode } from "react";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
}

const DefaultLayout = (props: LayoutProps) => {
  const description =
    "A collective intelligence game";
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#2B2B2B] to-[#1F1F1F]">
      <Head>
        <title>Synthasia</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-grey m-auto h-screen'>
        {props.children}
      </div>
    </div>
  );
};

export default DefaultLayout;
