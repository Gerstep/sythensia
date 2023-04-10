import React, { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { FaBrain, FaListAlt, FaPlayCircle, FaStar } from "react-icons/fa";
import Expand from "./expand";

interface ChatWindowProps {
    messages: Message[];
  }

const GameWindow = ( {messages} ) => {

    console.log(messages)

    return (
        <div className="h-full border-translucent flex w-full flex-col rounded-3xl border-2 border-white/20 bg-zinc-900 text-white shadow-2xl drop-shadow-lg ">
        <div className="mb-2 mr-2 h-[11em] overflow-y-auto overflow-x-hidden sm-h:h-[16em] md-h:h-[21em] lg-h:h-[30em] ">
          {messages.map((message, index) => (
            <Message key={`${index}-${message.type}`} message={message} />
          ))}


          {messages.length === 0 ? (
            <Expand delay={0.8} type="spring">
              <Message
                message={{
                  type: "system",
                  value:
                    "> Welcome to Synthasia! Choose your first action.",
                }}
              />
            </Expand>
          ) : (
            ""
          )}
        </div>
      </div>
    );
};

const getMessageIcon = (message: Message) => {
    switch (message.type) {
      case "goal":
        return <FaStar className="text-yellow-400" />;
      case "task":
        return <FaListAlt className="text-gray-300" />;
      case "thinking":
        return <FaBrain className="mt-[0.1em] text-pink-400" />;
      case "action":
        return <FaPlayCircle className="text-green-500" />;
    }
  };
  
  const getMessagePrefix = (message: Message) => {
    switch (message.type) {
      case "goal":
        return "Embarking on a new goal:";
      case "task":
        return "Added task:";
      case "thinking":
        return "Thinking...";
      case "action":
        return message.info ? message.info : "Executing:";
    }
  };
  
  export interface Message {
    type: "goal" | "thinking" | "task" | "action" | "system";
    info?: string;
    value: string;
  }

const Message = ({ message }: { message: Message }) => {
    return (
      <div className="mx-2 my-1 rounded-lg border-[2px] border-white/10 bg-white/20 p-2 font-mono text-sm hover:border-[#1E88E5]/40 sm:mx-4 sm:p-3 sm:text-base">
        <div className="mr-2 inline-block h-[0.9em]">
          {getMessageIcon(message)}
        </div>
        <span className="mr-2 font-bold">{getMessagePrefix(message)}</span>
        <span>{message.value}</span>
      </div>
    );
  };

export default GameWindow;
export { Message };