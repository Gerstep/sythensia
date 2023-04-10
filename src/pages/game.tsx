import React, { useState } from "react";
import Link from "next/link";
import GameWindow from "@/components/GameWindow";
import type { Message } from "@/components/GameWindow";
import Expand from "@/components/expand";
import { VscLoading } from "react-icons/vsc";
import Button from "@/components/Button";


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

      <Button className="mx-10">
        Explore
      </Button>
      <Button className="mx-10">
        Talk to NPC
      </Button>

      {/* <Button
        disabled={agent != null || name === "" || goalInput === ""}
        onClick={handleNewGoal}
        className="mt-10"
      >
        {agent == null ? (
          "Deploy Agent"
        ) : (
          <>
            <VscLoading className="animate-spin" size={20} />
            <span className="ml-2">Agent running</span>
          </>
        )}
      </Button> */}
    </>
  );
}