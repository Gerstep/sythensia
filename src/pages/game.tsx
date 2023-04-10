import React, { useState, useEffect } from "react";
import GameWindow from "@/components/GameWindow";
import type { Message } from "@/components/GameWindow";
import Expand from "@/components/expand";
import Button from "@/components/Button";
import AutonomousAgent from "@/components/AutonomousAgent";


export default function Game() {
  const [name, setName] = React.useState<string>("");
  const [goalInput, setGoalInput] = React.useState<string>("");
  const [agent, setAgent] = React.useState<AutonomousAgent | null>(null);
  const [newTaskAdded, setNewTaskAdded] = useState(false);

  const [messages, setMessages] = React.useState<Message[]>([]);

  useEffect(() => {
    setName("The Crypt")
    setGoalInput('Location is "The Crypt", a hidden underground network of tunnels and chambers that serves as a hub for the cypherpunk community in the world of web3. The Crypt is a place of secrecy and intrigue, where hackers, activists, and freedom fighters come together to exchange ideas and plan their next moves')
  }, []);

  useEffect(() => {
    const hasNewTask = messages.some(message => message.type === 'task');
    if (hasNewTask) {
      setNewTaskAdded(true);
    }
  }, [messages]);

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

        <Expand className="w-full h-3/4">
          <GameWindow messages={messages} />
        </Expand>

      {newTaskAdded ? (
        <div className="flex space-x-4">
          <Button>Select Option 1</Button>
          <Button>Select Option 2</Button>
          <Button>Select Option 3</Button>
        </div>
      ) : (
        <Button className="mx-10" onClick={handleTask}>Explore {name}</Button>
      )}
      </div></div></main>
    </>
  );
}