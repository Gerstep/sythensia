import HelloWorld from '../components/hello'

import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import CustomButton from "../components/CustomButton";
import { useAccount, useDisconnect } from "wagmi";
import Link from 'next/link';

export default function HomePage() {
  const { isConnected } = useAccount();

  return (
    <>
      {/* Predefined button  */}
      <Web3Button icon="show" label="Connect Wallet" balance="show" />
      <br />

      {/* Network Switcher Button */}
      <Web3NetworkSwitch />
      <br />

      <HelloWorld />

      {/* Custom button */}
      <CustomButton />
      <p></p>
      <Link href="/locations"> go to Locations </Link>
    </>
  );
}