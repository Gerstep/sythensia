import { OpenAI } from "langchain";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
  modelName: "gpt-3.5-turbo",
  maxTokens: 500,
});

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

const advancePrompt = new PromptTemplate({
    template:
      "You are a game master. Game location is `{goal}`. The player chose scenario `{options}`. Write a short story based on this scenario. Return the response as a string.",
    inputVariables: ["goal", "options"],
  });
  export const advanceAgent = async (goal: string, options: string) => {
    return await new LLMChain({ llm: model, prompt: advancePrompt }).call({
      goal,
      options
    });
  };

const executeTaskPrompt = new PromptTemplate({
  template:
    "You are an autonomous task execution AI called AgentGPT. You have the following objective `{goal}`. You have the following tasks `{task}`. Execute the task and return the response as a string.",
  inputVariables: ["goal", "task"],
});
export const executeTaskAgent = async (goal: string, task: string) => {
  return await new LLMChain({ llm: model, prompt: executeTaskPrompt }).call({
    goal,
    task,
  });
};

const createTaskPrompt = new PromptTemplate({
  template:
    "You are an AI task creation agent. You have the following objective `{goal}`. You have the following incomplete tasks `{tasks}` and have just executed the following task `{lastTask}` and received the following result `{result}`. Based on this, create a new task to be completed by your AI system ONLY IF NEEDED such that your goal is more closely reached or completely reached. Return the response as an array of strings that can be used in JSON.parse() and NOTHING ELSE",
  inputVariables: ["goal", "tasks", "lastTask", "result"],
});
export const executeCreateTaskAgent = async (
  goal: string,
  tasks: string[],
  lastTask: string,
  result: string
) => {
  return await new LLMChain({ llm: model, prompt: createTaskPrompt }).call({
    goal,
    tasks,
    lastTask,
    result,
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