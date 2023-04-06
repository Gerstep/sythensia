import { ChatOpenAI } from "langchain/chat_models";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { connectToDatabase } from '../../../db';

export default async function handler(req, res) {
  const chat = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  
  const message = await chat.generate([
    [
      new SystemChatMessage(
        'write three new words. each word on a new line'
      ),
      new HumanChatMessage(
        'start'
      ),
    ]
  ]);

  const response = message.generations[0][0].text
  console.log(response)

  try {
    const db = await connectToDatabase();
    const collection = db.collection('scenarios');
    const result = await collection.insertOne({ scenario: response });
    res.status(201).json({ message: "Scenario saved successfully", data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}


// [
//   new SystemChatMessage(
//     'You are a virtual game master. Your goal is to offer three potential events that might happen in the provided location. List three short scenarios. Split the scenarios with new line.'
//   ),
//   new HumanChatMessage(
//     'Location is "The Crypt", a hidden underground network of tunnels and chambers that serves as a hub for the cypherpunk community in the world of web3. The Crypt is a place of secrecy and intrigue, where hackers, activists, and freedom fighters come together to exchange ideas and plan their next moves.'
//   ),
// ]