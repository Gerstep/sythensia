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
      <main className="flex h-screen w-screen flex-row">
      
      <div
          id="content"
          className="z-10 flex h-screen w-full items-center justify-center p-2 px-2 sm:px-4 md:px-10"
        >
          <div
            id="layout"
            className="flex h-full w-full max-w-screen-lg flex-col items-center justify-between gap-3 py-5 md:justify-center"
          >
            <div
              id="title"
              className="relative flex flex-col items-center font-mono"
            >
              <div className="flex flex-row items-start">
                <span className="text-4xl font-bold xs:text-5xl sm:text-6xl">
                  Synthasia
                </span>
              </div>
            </div>

        <Expand className="w-full h-screen">
          <GameWindow messages={messages} />
        </Expand>

      <Button 
        className="mx-10"
        onClick={handleTask}
      >
        Explore
      </Button>

      </div></div></main>
      {/* <Button 
        className="mx-10"
        onClick={handleStopAgent}
      >
        Talk to NPC
      </Button> */}
    </>
  );
}