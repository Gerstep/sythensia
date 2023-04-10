import React, { useState } from "react";
import Link from "next/link";
import GameWindow from "@/components/GameWindow";
import type { Message } from "@/components/GameWindow";
import Expand from "@/components/expand";


export default function Game() {

  // const [messages] = React.useState<Message[]>([]);

  return (
    <>
      <Link href="/">
        <button className="rounded-lg px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300">Home</button>
      </Link>

      <div className="m-2">
        <Expand className="w-full">
          <GameWindow />
        </Expand>
      </div>
    </>
  );
}