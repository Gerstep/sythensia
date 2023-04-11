import React, { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { FaBrain, FaBolt, FaPlayCircle, FaStar, FaHotjar } from "react-icons/fa";
import Expand from "./expand";

interface ChatWindowProps {
    messages: Message[];
  }

const GameWindow = ( {messages, name} ) => {

    console.log(messages)

    return (
        <>
        <div className="border-translucent h-full flex w-full flex-col rounded-3xl border-2 border-white/20 bg-zinc-900 text-white shadow-2xl drop-shadow-lg ">
        <div className="flex gap-1 rounded-t-3xl p-3">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="mb-2 mr-2 overflow-y-auto overflow-x-hidden sm-h:h-[16em] md-h:h-[21em] lg-h:h-[30em] ">
          {messages.map((message, index) => (
            <Message key={`${index}-${message.type}`} message={message} />
          ))}


          {messages.length === 0 ? (
            <Expand delay={0.8} type="spring">
              <Message
                message={{
                  type: "system",
                  value:
                    "👋 Welcome to Sythasia — a virtual world constructed collectively by AI agents and humans.",
                }}
              />
              <Message
                message={{
                  type: "system",
                  value:
                    "⛩ You enter your first location, "+ name + "! Choose your action.",
                }}
              />
            </Expand>
          ) : (
            ""
          )}
        </div>
      </div>
      </>
    );
};

const getMessageIcon = (message: Message) => {
    switch (message.type) {
      case "goal":
        return <FaStar className="text-yellow-400" />;
      case "task":
        return <FaBolt className="text-blue-300" />;
      case "thinking":
        return <FaBrain className="mt-[0.1em] text-pink-400" />;
      case "advancing":
        return <FaBrain className="mt-[0.1em] text-pink-400" />;
      case "story":
        return <FaHotjar className="mt-[0.1em] text-pink-400" />;
      case "action":
        return <FaPlayCircle className="text-green-500" />;
    }
  };
  
  const getMessagePrefix = (message: Message) => {
    switch (message.type) {
      case "goal":
        return "Starting a new journey:";
      case "task":
        return "Option:";
      case "story":
        return "Here's what happened:";
      case "thinking":
        return "Thinking...";
      case "advancing":
        return "Advancing the story...";
      case "action":
        return message.info ? message.info : "Executing:";
    }
  };
  
  export interface Message {
    type: "goal" | "thinking" | "task" | "action" | "system" | "advancing" | "story";
    info?: string;
    value: string;
    summary?: string;
  }

const Message = ({ message }: { message: Message }) => {
    return (
      <div className="mx-2 my-1 rounded-lg border-[2px] border-white/10 bg-white/20 p-2 font-mono text-sm hover:border-[#1E88E5]/40 sm:mx-4 sm:p-3 sm:text-base">
        <div className="mr-2 inline-block h-[0.9em]">
          {getMessageIcon(message)}
        </div>
        <span className="mr-2 font-bold">{getMessagePrefix(message)}</span>
        {getMessagePrefix(message) && <p></p>}
        <span>{message.value}</span>
      </div>
    );
  };

export default GameWindow;
export { Message };