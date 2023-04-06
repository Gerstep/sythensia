import { MongoClient, MongoClientOptions, Db } from 'mongodb';

const clientOptions: MongoClientOptions = {
  connectTimeoutMS: 5000
};

const uri = process.env.MONGODB_URI as string;

let cachedDb: Db = null;

export async function connectToDatabase() {
  if (cachedDb) {
    console.log('Using cached MongoDB connection');
    return cachedDb;
  }

  const client = new MongoClient(uri, clientOptions);
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    cachedDb = client.db();
    return cachedDb;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas', error);
    throw error;
  }
}