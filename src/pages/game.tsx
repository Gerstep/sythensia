import React, { useState, useEffect } from "react";
import Link from "next/link";
import GameWindow from "@/components/GameWindow";
import type { Message } from "@/components/GameWindow";
import Expand from "@/components/expand";
import { VscLoading } from "react-icons/vsc";
import Button from "@/components/Button";
import AutonomousAgent from "@/components/AutonomousAgent";


export default function Game() {
  const [name, setName] = React.useState<string>("");
  const [goalInput, setGoalInput] = React.useState<string>("");
  const [agent, setAgent] = React.useState<AutonomousAgent | null>(null);

  const [messages, setMessages] = React.useState<Message[]>([]);

  const handleTask = () => {
    const addMessage = (message: Message) =>
      setMessages((prev) => [...prev, message]);
    const agent = new AutonomousAgent(name, goalInput, addMessage, () =>
      setAgent(null)
    );
    setAgent(agent);
    agent.run().then(console.log).catch(console.error);
  };

  return (
    <>
      <Link href="/">
        <button className="rounded-lg px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300">Home</button>
      </Link>

      <div className="m-2">
        <Expand className="w-full">
          <GameWindow messages={messages} />
        </Expand>
      </div>

      <Button 
        className="mx-10"
        onClick={handleTask}
      >
        Explore
      </Button>
      {/* <Button 
        className="mx-10"
        onClick={handleStopAgent}
      >
        Talk to NPC
      </Button> */}
    </>
  );
}