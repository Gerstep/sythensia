import { ChatOpenAI } from "langchain/chat_models";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

export default async function handler(req, res) {
  const chat = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  
  const message = await chat.generate([
    [
      new SystemChatMessage(
        "You translate English to French."
      ),
      new HumanChatMessage(
        "I love programming."
      ),
    ]
  ]);

  const response = message.generations[0][0].text

  res.status(200).json(response);
}


// new SystemChatMessage(
//   'You are a virtual game master. Your goal is to offer three potential events that might happen in the provided location. List three scenarios. Split the scenarios with new line.'
// ),
// new HumanChatMessage(
//   'Location is "The Crypt", a hidden underground network of tunnels and chambers that serves as a hub for the cypherpunk community in the world of web3. The Crypt is a place of secrecy and intrigue, where hackers, activists, and freedom fighters come together to exchange ideas and plan their next moves.'
// ),