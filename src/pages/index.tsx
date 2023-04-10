import HelloWorld from '../components/hello'

import { useAccount, useDisconnect } from "wagmi";
import Link from 'next/link';

export default function HomePage() {
  const { isConnected } = useAccount();

  return (
    <>
      <br />

      <HelloWorld />

      <Link href="/game">
        <button className='m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Launch game</button>
      </Link>

      <Link href="/locations" className='
      bg-transparent hover:bg-blue-500 text-blue-700 my-5 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded'>
         Game Evolution 
      </Link>
    </>
  );
}