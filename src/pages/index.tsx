import HelloWorld from '../components/hello'

import { useAccount, useDisconnect } from "wagmi";
import Link from 'next/link';

export default function HomePage() {
  const { isConnected } = useAccount();

  return (
    <>
      <br />

      <HelloWorld />

      <p></p>
      <Link href="/locations"> Go To Locations </Link>
    </>
  );
}