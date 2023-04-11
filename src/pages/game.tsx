import React, { useState, useEffect } from "react";
import GameWindow from "@/components/GameWindow";
import type { Message } from "@/components/GameWindow";
import Expand from "@/components/expand";
import Button from "@/components/Button";
import AutonomousAgent from "@/components/AutonomousAgent";
import DefaultLayout from '@/components/DefaultLayout';
import Router, { useRouter } from "next/router";


export default function Game() {
  const router = useRouter();
  const { locationName, locationDescription } = router.query;
  const [ name, setName] = React.useState<string>("");
  const [goalInput, setGoalInput] = React.useState<string>("");
  const [agent, setAgent] = React.useState<AutonomousAgent | null>(null);
  const [newTaskAdded, setNewTaskAdded] = useState(false);
  const [taskMessages, setTaskMessages] = useState<string[]>([]);

  const [messages, setMessages] = React.useState<Message[]>([]);

  useEffect(() => {
    setName(locationName || "The Crypt")
    setGoalInput(locationDescription || 'Location is "The Crypt", a hidden underground network of tunnels and chambers that serves as a hub for the cypherpunk community in the world of web3. The Crypt is a place of secrecy and intrigue, where hackers, activists, and freedom fighters come together to exchange ideas and plan their next moves.')
  }, []);

  useEffect(() => {
    const filteredMessages = messages.filter(message => message.type === 'task').map(message => ({ value: message.value, summary: message.summary }));
    if (filteredMessages.length > 0) {
      setNewTaskAdded(true);
      const lastThreeTasks = filteredMessages.slice(-3);
      setTaskMessages(lastThreeTasks);
    }    
  }, [messages]);

  // generate options
  const handleTask = () => {
    const addMessage = (message: Message) =>
      setMessages((prev) => [...prev, message]);
    const agent = new AutonomousAgent(name, goalInput, addMessage, () =>
      setAgent(null)
    );
    setAgent(agent);
    agent.run().then(console.log).catch(console.error);
  };

  const advance = (options) => {
    const addMessage = (message: Message) =>
      setMessages((prev) => [...prev, message]);
    const agent = new AutonomousAgent(name, goalInput, addMessage, () =>
      setAgent(null)
    );
    setAgent(agent);
    agent.advance(options).then(console.log).catch(console.error);
  };

  return (
    <DefaultLayout>
      <main className="flex h-full w-screen flex-row">
      
      <div
          id="content"
          className="z-10 flex h-screen w-full items-center justify-center p-2 px-2 sm:px-4 md:px-10"
        >
          <div
            id="layout"
            className="flex h-full w-full max-w-screen-lg flex-col items-center justify-between gap-3 md:justify-center"
          >
            <div
              id="title"
              className="relative flex flex-col items-center font-mono"
            >
              <div className="flex flex-row items-start">
                <span className="text-2xl font-bold xs:text-3xl sm:text-4xl text-gray-400">
                  Synthasia
                </span>
              </div>
            </div>

        <Expand className="w-full h-3/4">
          <GameWindow messages={messages} name={name} />
        </Expand>

      <div className="mx-2 my-1 rounded-lg border-[2px] border-white/10 font-mono text-base w-full p-2 text-white">
        {newTaskAdded ? (
          <div className="flex space-x-4">
            <span className="mr-2 font-bold p-2 my-2">Make a choice</span>
            {taskMessages.map(task => ( 
              <Button key={task.summary} onClick={() => advance(task.value)}>
                {task.summary.replace(/^["'](.*)["']\.?$/, '$1')}
              </Button>
            ))}
          </div>
        ) : (
          <Button className="" onClick={handleTask}>Explore {name}</Button>
        )}
      </div>
      </div></div></main>
    </DefaultLayout>
  );
}