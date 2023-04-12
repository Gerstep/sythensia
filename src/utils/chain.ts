import { OpenAI } from "langchain";
import { ChatOpenAI } from "langchain/chat_models";
import { PromptTemplate } from "langchain/prompts";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { LLMChain } from "langchain/chains";

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
  modelName: "gpt-3.5-turbo",
  maxTokens: 300,
});

const chat = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});


export const genLocationAgent = async () => {
  return await chat.generate([
    [
      new SystemChatMessage(
        'You are an AI that generates locations for a massive multiplayer online game. Each location must have a visual description, a short backstory describing the history of the place. Write one paragraph. Reply in the following format: "Location: {Name of the location} Description: {Location desctiption}'
      ),
      new HumanChatMessage(
        'Please, create you first location.'
      ),
    ]
  ]);
};

const startGoalPrompt = new PromptTemplate({
  template:
    "You are a game master. You need to come up with potential scenarios for a game location `{goal}`. Create a list of zero to three possible game scenarios. Return the response as an array of strings that can be used in JSON.parse()",
  inputVariables: ["goal"],
});
export const startGoalAgent = async (goal: string) => {
  return await new LLMChain({ llm: model, prompt: startGoalPrompt }).call({
    goal,
  });
};

// Beggining of the story
const advancePrompt = new PromptTemplate({
    template:
      "You are a game master. Game location is `{goal}`. The player chose scenario `{options}`. Write a beginning of a story. It should introduce main charater or characters and describe the story setting. Return the response as a string.",
    inputVariables: ["goal", "options"],
  });
  export const advanceAgent = async (goal: string, options: string) => {
    return await new LLMChain({ llm: model, prompt: advancePrompt }).call({
      goal,
      options
    });
  };

// Conflict
const conflictPrompt = new PromptTemplate({
    template:
      "You are a game master. Game location is `{goal}`. Previously the following happened: `{result}`. You need write exactly three options of how this story might continue. Return the response as an array of strings that can be used in JSON.parse()",
    inputVariables: ["goal", "result"],
  });
  export const getConflictOptions = async (
    goal: string,
    result: string
  ) => {
    return await new LLMChain({ llm: model, prompt: conflictPrompt }).call({
      goal,
      result,
    });
  };

const summarizePrompt = new PromptTemplate({
  template:
    "You are a game master. Your goal is to create a name for the following story: `{task}`. Return the response as a string with no more than 5 words.",
  inputVariables: ["task"],
});
export const summarizeAgent = async (task: string) => {
  return await new LLMChain({ llm: model, prompt: summarizePrompt }).call({
    task,
  });
};

const executeTaskPrompt = new PromptTemplate({
  template:
    "You are an autonomous task execution AI called AgentGPT. You have the following objective `{goal}`. You have the following tasks `{task}`. Execute the task and return the response as a string without quotes.",
  inputVariables: ["goal", "task"],
});
export const executeTaskAgent = async (
    goal: string, 
    task: string
  ) => {
  return await new LLMChain({ llm: model, prompt: executeTaskPrompt }).call({
    goal,
    task,
  });
};

export const extractArray = (inputStr: string): string[] => {
  // Match an outer array of strings (including nested arrays)
  const regex = /(\[(?:\s*"(?:[^"\\]|\\.)*"\s*,?)+\s*\])/;
  const match = inputStr.match(regex);

  if (match && match[0]) {
    try {
      // Parse the matched string to get the array
      return JSON.parse(match[0]) as string[];
    } catch (error) {
      console.error("Error parsing the matched array:", error);
    }
  }

  console.error("Error, could not extract array from inputString:", inputStr);
  return [];
};